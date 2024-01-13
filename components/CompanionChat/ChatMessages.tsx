"use client";

import { Companion } from "@prisma/client";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface ChatMessagesProps {
  messages: any[];
  companion: Companion;
  isLoading: boolean;
}

const ChatMessages = ({
  messages = [],
  isLoading,
  companion,
}: ChatMessagesProps) => {
  //   const scrollRef = useRef<ElementRef<"div">>(null);

  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );
  const { user } = useUser();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  //   useEffect(() => {
  //     scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  //   }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <Message
        isLoading={fakeLoading}
        src={companion.src}
        role="companion"
        content={`Hello ${user?.firstName}, I am ${companion.name}, ${companion.description}`}
      />

      {messages.map((message: any) => (
        <Message
          key={message.content}
          src={companion.src}
          content={message.content}
          role={message.role}
        />
      ))}
      {isLoading && <Message src={companion.src} role="companion" isLoading />}
      {/* <div ref={scrollRef} /> */}
    </div>
  );
};

export default ChatMessages;
