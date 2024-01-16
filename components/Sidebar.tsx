"use client";

import { cn } from "@/lib/utils";
import { Home, Plus, Settings, Info, BellPlus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AuthorCard } from "./AuthorCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [state, setState] = useState(false);

  const routes = [
    {
      icon: Home,
      label: "Home",
      href: "/",
    },
    {
      icon: Plus,
      label: "Create",
      href: "/companion/new",
    },
    {
      icon: BellPlus,
      label: "Updates",
      href: "/updates",
    },
  ];

  const onNavigate = (url: string) => {
    return router.push(url);
  };

  return (
    <div className="space-y-4 bg-secondary h-full text-primary ">
      <div className="flex-1 p-3 flex justify-center">
        <div className="space-y-2">
          {routes.map((ele) => (
            <div
              onClick={() => {
                onNavigate(ele.href);
              }}
              key={ele.href}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathName === ele.href && "bg-primary/10 text-primary"
              )}
            >
              <div className="flex flex-col gap-y-2 items-center justify-center flex-1">
                <ele.icon className="h-5 w-5" />
                {ele.label}
              </div>
            </div>
          ))}
          <div
            className={`fixed bottom-3 text-muted-foreground text-xs group p-3  font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition
              flex flex-col gap-y-2 items-center justify-center`}
            onClick={(prev) => setState(!prev)}
          >
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Info className="h-5 w-5" />
                  <span>Author</span>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogDescription>
                    <AuthorCard />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Close</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
