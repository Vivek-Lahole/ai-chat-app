// "use client";

// import { useCompletion } from "ai/react";
import { FormEvent, useState } from "react";
import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";

// import { ChatForm } from "@/components/chat-form";
import { ChatHeader } from "@/components/CompanionChat/ChatHeader";
import Image from "next/image";
// import { ChatMessages } from "@/components/chat-messages";
// import { ChatMessageProps } from "@/components/chat-message";

import { Separator } from "@/components/ui/separator";

export const ChatClient = ({
  companion,
}: {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}) => {
  const router = useRouter();
  //   const [messages, setMessages] = useState<ChatMessageProps[]>(
  //     companion.messages
  //   );

  //   const { input, isLoading, handleInputChange, handleSubmit, setInput } =
  // useCompletion({
  //   api: `/api/chat/${companion.id}`,
  //   onFinish(_prompt, completion) {
  //     const systemMessage: ChatMessageProps = {
  //       role: "system",
  //       content: completion,
  //     };

  //     setMessages((current) => [...current, systemMessage]);
  //     setInput("");

  //     router.refresh();
  //   },
  // });

  //   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
  //     const userMessage: ChatMessageProps = {
  //       role: "user",
  //       content: input,
  //     };

  //     setMessages((current) => [...current, userMessage]);

  //     handleSubmit(e);
  //   };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 h-full w-full p-4 space-y-2">
      <div className="border-r p-4 border-primary/10 rounded-lg transition flex-col space-y-4 md:col-span-1 lg:col-span-1 hidden md:flex items-center">
        <div className="relative h-60 w-60 mx-auto mt-10">
          <Image
            fill
            alt="Upload"
            src={companion.src}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight text-center">
          {companion.name}
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6 p-3">
          Description : {companion.description}
        </p>
      </div>
      <div className="flex flex-col md:col-span-2 lg:col-span-3">
        <ChatHeader companion={companion} />
      </div>
      {/* <ChatMessages
        companion={companion}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      /> */}
    </div>
  );
};
