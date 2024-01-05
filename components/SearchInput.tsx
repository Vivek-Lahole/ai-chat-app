"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const categoryID = searchParams.get("categoryID");
  const name = searchParams.get("name");

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`${pathName}?${params.toString()}`);
    console.log(`"route " + ${pathName}?${params.toString()}`);
    console.log("window " + window.location);
  }, 300);

  return (
    <div className="relative">
      <Search className="absolute h-4 w-4 top-3 left-3 text-muted-foreground" />
      <Input
        placeholder="Search..."
        className="pl-10 bg-primary/10"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
};

export default SearchInput;
