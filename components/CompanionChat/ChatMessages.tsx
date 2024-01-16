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

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <Message
        isLoading={fakeLoading}
        src={companion.src}
        role="companion"
        content={`Hello ${user?.firstName}, How was your Day?`}
      />

      {messages.map((message: any) => {
        if (!message.content) {
          return;
        }
        return (
          <Message
            key={message.content}
            src={companion.src}
            content={message.content}
            role={message.role}
          />
        );
      })}
      {isLoading && (
        <Message src={companion.src} role="companion" isLoading={isLoading} />
      )}
    </div>
  );
};

export default ChatMessages;
