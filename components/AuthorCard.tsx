"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GithubIcon, LinkedinIcon, Mail } from "lucide-react";

export function AuthorCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hello there !</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid items-center justify-center gap-4">
          <div className="flex items-center justify-center">
            <Avatar className="w-40 h-40">
              <AvatarImage src="/author.jpg" alt="AuthorImage" />
              <AvatarFallback>VL</AvatarFallback>
            </Avatar>
            <div className="flex flex-col ml-4">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Vivek Lahole
              </h4>
              <p>
                Passionate about turning ideas into reality and learning new
                tech stacks. Experienced in the end-to-end web application
                development cycle, from conception to crafting scalable code.
                #WebDevelopment #Innovation #TechEnthusiast 🚀
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size={"icon"}>
          <a href="https://github.com/Vivek-Lahole">
            <GithubIcon />
          </a>
        </Button>
        <Button variant="outline" size={"icon"}>
          <a href="https://www.linkedin.com/in/vivek-lahole-4b62581b9/">
            <LinkedinIcon />
          </a>
        </Button>
        <Button variant="outline" size={"icon"}>
          <Mail />
        </Button>
      </CardFooter>
    </Card>
  );
}
