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
import { Separator } from "./ui/separator";

export function AuthorCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hello there !</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid items-center justify-center gap-4">
          <div className="flex items-center justify-center">
            <div className="flex flex-col ml-4">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Vivek Lahole
              </h4>
              <Separator className="bg-primary/10" />
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
