import SearchInput from "@/components/SearchInput";
import { UserButton } from "@clerk/nextjs";

const RootPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-3 space-y-4 h-full">
      <SearchInput />
      {children}
    </div>
  );
};

export default RootPage;
