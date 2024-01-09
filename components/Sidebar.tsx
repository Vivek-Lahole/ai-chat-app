"use client";

import { cn } from "@/lib/utils";
import { Home, Plus, Settings, Info } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const routes = [
    {
      icon: Home,
      label: "Home",
      href: "/",
      pro: false,
    },
    {
      icon: Plus,
      label: "Create",
      href: "/companion/new",
      pro: true,
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      pro: false,
    },
  ];

  const onNavigate = (url: string, pro: boolean) => {
    if (pro) {
    }
    return router.push(url);
  };

  return (
    <div className="space-y-4 bg-secondary h-full text-primary shadow-md">
      <div className="flex-1 p-3 flex justify-center">
        <div className="space-y-2">
          {routes.map((ele) => (
            <div
              onClick={() => {
                onNavigate(ele.href, ele.pro);
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
          >
            <Info className="h-5 w-5" />
            <a href="https://www.linkedin.com/in/vivek-lahole-4b62581b9/">
              {"Author"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
