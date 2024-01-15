"use client";

import { BeatLoader } from "react-spinners";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

export interface ChatMessageProps {
  role: "companion" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
}

const Message = ({ role, content, isLoading, src }: ChatMessageProps) => {
  const { theme } = useTheme();
  const { user } = useUser();

  return (
    <div
      className={cn(
        "group flex items-start gap-x-3 py-4 w-full",
        role === "user" && "justify-end"
      )}
    >
      {role !== "user" && src && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={src} />
          <AvatarFallback>V</AvatarFallback>
        </Avatar>
      )}
      <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/20">
        {isLoading ? (
          <BeatLoader color={theme === "light" ? "black" : "white"} size={5} />
        ) : (
          content
        )}
      </div>
      {role === "user" && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>V</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default Message;
