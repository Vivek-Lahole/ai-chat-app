import Image from "next/image";
import Link from "next/link";
import { Companion } from "@prisma/client";
import { MessagesSquare } from "lucide-react";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";

interface CompanionsProps {
  data: Companion[];
}

const formatCustomDate = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
  });
  const parts = formatter.formatToParts(date);

  const month = parts.find((part) => part.type === "month")?.value;
  const year = parts.find((part) => part.type === "year")?.value;

  if (month && year) {
    return `${month.toUpperCase()}'${year}`;
  }

  return "Invalid Date";
};

export const Companions = ({ data }: CompanionsProps) => {
  if (data.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-lg text-muted-foreground">
          Oops! No companions found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-8">
      {data.map((item) => (
        <Card
          key={item.name}
          className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0 "
        >
          <Link href={`/chat/${item.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative w-36 h-36">
                <Image
                  src={item.src}
                  fill
                  className="rounded-xl object-cover"
                  alt="Character"
                />
              </div>
              <p className="font-bold">{item.name}</p>
              <p className="text-xs">{item.description}</p>
            </CardHeader>
            <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
              <p>creted by @{item.userName}</p>
              <p>{formatCustomDate(item.updatedAt)}</p>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};
