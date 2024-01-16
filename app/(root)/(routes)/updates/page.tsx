import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function TypographyDemo() {
  return (
    <div className="p-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center">
        <Image
          src={"/logo1.svg"}
          alt="logo"
          width={75}
          height={75}
          className="mx-2"
        />
        chat.ai
        <Badge variant={"secondary"}>Beta</Badge>
      </h1>
      <p className="leading-7 [&:not(:first-child)] text-sm text-muted-foreground ml-3">
        This Project is under Development
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Introducing our AI-Chat-App where users can personalize their chat
        experience by creating custom characters. Engage in real-time
        conversations with these characters, powered by advanced language models
        like GPT. Additionally, users can craft fictional personalities with
        minimal input, training custom models for diverse and imaginative
        interactions. Explore the exciting world of conversational AI and bring
        your characters to life with our user-friendly platform
      </p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Upcoming Features
      </h3>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>NextJS Auth, Email Verification and 2-Factor Authentication</li>
        <li>More Engaged AI characters with long term memory</li>
        <li>Migration to Supabase Open-Source Database</li>
        <li>Admin and User based Model</li>
        <li>Migration to Hugging Face LLM</li>
        <li>Containerize Codebase with Docker</li>
      </ul>
    </div>
  );
}
