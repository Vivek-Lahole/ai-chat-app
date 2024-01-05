import SearchInput from "@/components/SearchInput";
import { UserButton } from "@clerk/nextjs";

const RootPage = () => {
  return (
    <div className="p-3 space-y-4 h-full">
      <SearchInput />
    </div>
  );
};

export default RootPage;
