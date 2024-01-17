"use client";

// import { useCompletion } from "ai/react";
import { FormEvent, useEffect, useState } from "react";
import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChatHeader } from "@/components/CompanionChat/ChatHeader";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";
import ChatMessages from "./ChatMessages";
import { useChat, useCompletion } from "ai/react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ChatMessageProps } from "./Message";
import { Separator } from "../ui/separator";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

  const {
    completion,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    stop,
    setInput,
    setCompletion,
  } = useCompletion({
    api: `/api/chat/${companion.id}`,
  });

  useEffect(() => {
    console.log("COMPLETION", completion);
    const companionMessage: ChatMessageProps = {
      role: "companion",
      content: completion,
    };
    setMessages((current) => [...current, companionMessage]);
  }, [completion, setInput]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    handleSubmit(e);
  };

  return (
    <div className="flex h-screen w-full p-2 space-y-2">
      <div className="border-r p-4 border-primary/10 rounded-lg transition flex-col space-y-4 md:col-span-1 lg:col-span-1 hidden md:block items-center max-w-2xl overflow-y-auto">
        <Alert variant="default">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>
            Due to limited Resourses, charater might not reply if question if
            very descriptive!
          </AlertDescription>
        </Alert>
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
        <Separator className="bg-primary/10" />
        <p className="leading-7 [&:not(:first-child)]:mt-6 p-3">
          Description : {companion.description}
        </p>
        <Separator className="bg-primary/10" />
        <p className="leading-7 [&:not(:first-child)]:mt-6 p-3">
          {companion.backstory}
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
              className="flex-1 flex items-center justify-center mt-1 p-2"
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
