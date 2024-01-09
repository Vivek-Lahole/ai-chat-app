import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Sparkles, MessageSquareText } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "./ui/button";
import ModeToggle from "./ui/ModeToggle";
import MobileSidebar from "../components/MobileSidebar";
import { Badge } from "@/components/ui/badge";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Navbar = () => {
  return (
    <div className="h-16 w-full flex justify-between items-center py-4 px-4 fixed bg-secondary">
      <div className="flex items-center">
        <MobileSidebar />
        <div className="flex space-x-2 p-2">
          <Link href={"/"} className="flex">
            <MessageSquareText className="w-8 h-8 m-2" />
            <h1
              className={cn(
                "hidden md:block text-primary text-xl md:text-3xl font-semibold ",
                font.className
              )}
            >
              chat.ai
            </h1>
          </Link>
          <Badge variant="outline" className="w-12 h-5 hidden md:block">
            Beta
          </Badge>
        </div>
      </div>
      <div className="gap-x-3 flex items-center">
        <Button className="sm" variant={"premium"}>
          Upgrade
          <Sparkles className="w-4 h-4 ml-2 text-white fill-white" />
        </Button>
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
