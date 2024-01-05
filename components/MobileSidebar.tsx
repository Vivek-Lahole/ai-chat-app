import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild className="block md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-secondary pt-10 w-32">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
