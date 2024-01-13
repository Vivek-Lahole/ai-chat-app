"use client";

// import { useCompletion } from "ai/react";
import { FormEvent, useState } from "react";
import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChatHeader } from "@/components/CompanionChat/ChatHeader";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";
import ChatMessages from "./ChatMessages";
import { useChat, useCompletion } from "ai/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ChatMessageProps } from "./Message";

interface ChatClientProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Empty Message",
  }),
});

export const ChatClient = ({ companion }: ChatClientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    companion.messages
  );

  // console.log(messages);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(_prompt: any, completion: any) {
        const systemMessage: ChatMessageProps = {
          role: "companion",
          content: completion,
        };

        setMessages((current) => [...current, systemMessage]);
        setInput("");

        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    };

    setMessages((current) => [...current, userMessage]);

    handleSubmit(e);
  };

  return (
    <div className="flex h-screen w-full p-2 space-y-2">
      <div className="border-r p-4 border-primary/10 rounded-lg transition flex-col space-y-4 md:col-span-1 lg:col-span-1 hidden md:block items-center">
        <div className="relative h-64 w-64 mx-auto mt-10 border-4 border-dashed border-primary/10 ">
          <Image
            fill
            alt="companion Image"
            src={companion.src}
            className="rounded-lg object-cover w-full h-full p-4"
          />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight text-center underline">
          {companion.name}
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6 p-3">
          Description : {companion.description}
        </p>
      </div>
      <div className="flex flex-1 flex-col ">
        <ChatHeader companion={companion} />
        <div className="flex-1 p-2 overflow-y-auto">
          <ChatMessages
            companion={companion}
            isLoading={isLoading}
            messages={messages}
          />
        </div>
        <div className="flex justify-center">
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="flex-1 flex items-center justify-center mt-1"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        className="w-full flex-1"
                        placeholder="Type your message here....."
                        {...field}
                        onChange={handleInputChange}
                        value={input}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" variant={"ghost"} disabled={isLoading}>
                <SendHorizonal className="h-6 w-6" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
