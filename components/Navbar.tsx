import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "./ui/button";
import ModeToggle from "./ui/ModeToggle";
import MobileSidebar from "../components/MobileSidebar";
import Image from "next/image";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Navbar = () => {
  return (
    <div
      className="h-16 w-full flex justify-between items-center py-4 px-4 fixed bg-secondary
     z-50"
    >
      <div className="flex items-center">
        <MobileSidebar />
        <Link href={"/"}>
          <h1
            className={cn(
              "hidden md:block text-primary text-xl md:text-3xl font-semibold ",
              font.className
            )}
          >
            chat.ai
          </h1>
        </Link>
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
