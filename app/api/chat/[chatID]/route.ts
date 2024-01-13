import { OpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import { LLMChain } from "langchain/chains";
import { StreamingTextResponse, LangChainStream } from "ai";
import clerk from "@clerk/clerk-sdk-node";
import { CallbackManager } from "langchain/callbacks";
import { PromptTemplate } from "@langchain/core/prompts";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import MemoryManager from "@/lib/memory";
import { rateLimit } from "@/lib/rateLimit";
import prisma from "@/lib/Prisma";

dotenv.config({ path: `.env.local` });

export async function POST(
  req: Request,
  { params }: { params: { chatID: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { prompt } = await req.json();
    console.log(prompt);
    const identifier = req.url + "-" + user.id;
    const { success } = await rateLimit(identifier);

    if (!success) {
      console.log("INFO: rate limit exceeded");
      return new NextResponse(
        JSON.stringify({ Message: "Hi, the companions can't talk this fast." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    const companion = await prisma.companion.update({
      where: {
        id: params.chatID,
      },
      data: {
        messages: {
          create: {
            role: "user",
            content: prompt,
            userId: user.id,
          },
        },
      },
    });

    // XXX Companion name passed here. Can use as a key to get backstory, chat history etc.
    const name = companion?.id;
    const companionFileName = name + ".txt";

    console.log("prompt: ", prompt);

    const instructions = companion?.instructions;
    const seedchat: string = companion ? companion.seed : "";

    const companionKey = {
      companionName: name!,
      modelName: "chatgpt",
      userId: user.id,
    };
    const memoryManager = await MemoryManager.getInstance();

    const records = await memoryManager.readLatestHistory(companionKey);
    if (records.length === 0) {
      await memoryManager.seedChatHistory(seedchat, "\n\n", companionKey);
    }

    await memoryManager.writeToHistory("User: " + prompt + "\n", companionKey);
    let recentChatHistory = await memoryManager.readLatestHistory(companionKey);

    // query Pinecone
    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      companionFileName
    );

    let relevantHistory = "";
    if (!!similarDocs && similarDocs.length !== 0) {
      relevantHistory = similarDocs
        .map((doc: any) => doc.pageContent)
        .join("\n");
    }

    const { stream, handlers } = LangChainStream();

    const model = new OpenAI({
      streaming: true,
      modelName: "gpt-3.5-turbo-16k",
      openAIApiKey: process.env.OPENAI_API_KEY,
      // callbackManager: CallbackManager.fromHandlers(handlers),
      // callbacks:call
    });
    model.verbose = true;

    const chainPrompt = PromptTemplate.fromTemplate(`
    You are ${name} and are currently talking to ${user.firstName}.

    ${instructions}

    You reply with answers that range from one sentence to one paragraph and with some details. Reply only within 1000 characters

    Below are relevant details about ${name}'s past
    ${relevantHistory}
  
    Below is a relevant conversation history

  ${recentChatHistory}`);

    console.log("Reached Here");

    const chain = new LLMChain({
      llm: model,
      prompt: chainPrompt,
    });

    const result = await chain
      .call({
        relevantHistory,
        recentChatHistory: recentChatHistory,
      })
      .catch(console.error);

    console.log("result is here", result);

    if (result) {
      await prisma.companion.update({
        where: {
          id: params.chatID,
        },
        data: {
          messages: {
            create: {
              content: result.text,
              role: "companion",
              userId: user.id,
            },
          },
        },
      });
    }
    const chatHistoryRecord = await memoryManager.writeToHistory(
      result!.text + "\n",
      companionKey
    );
    console.log("chatHistoryRecord", chatHistoryRecord);

    return NextResponse.json(result);
  } catch (err) {
    console.log("RESPONSE_ERROR", err);
  }
}
