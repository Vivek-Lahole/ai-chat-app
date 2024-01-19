import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/Prisma";
import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
// import { PineconeStore } from "@langchain/pinecone";
import { CharacterTextSplitter } from "langchain/text_splitter";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const {
      src,
      name,
      description,
      instructions,
      seed,
      categoryId,
      backstory,
    } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId ||
      !backstory
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    try {
      const splitter = new CharacterTextSplitter({
        separator: " ",
        chunkSize: 200,
        chunkOverlap: 50,
      });

      const splitData = await splitter.createDocuments([backstory]);

      const splittedData = splitData.map((doc) => {
        return new Document({
          metadata: { fileName: `${user.id}-${name}` },
          pageContent: doc.pageContent,
        });
      });

      const client = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY!,
        environment: process.env.PINECONE_ENVIRONMENT!,
      });
      const pineconeIndex = client.Index(process.env.PINECONE_INDEX!);
      const pineconeStore = new PineconeStore(
        new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        }),
        {
          pineconeIndex,
        }
      );
      const ids = await pineconeStore.addDocuments(splittedData);
      console.log("IDS of DOCUMENTS", ids);
      const companion = await prisma.companion.create({
        data: {
          categoryId,
          userId: user.id,
          userName: user.firstName,
          src,
          name,
          description,
          instructions,
          backstory,
          seed,
          vectorID: ids,
        },
      });
      console.log("Created Companion", companion);
      return NextResponse.json(companion);
    } catch (error) {
      console.log("ERROR_COMPANION_CREATE", error);
    }
  } catch (error) {
    console.log("[COMPANION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
