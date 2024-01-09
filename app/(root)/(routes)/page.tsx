import SearchInput from "@/components/SearchInput";
import prisma from "@/lib/Prisma";
import Categories from "@/components/Catgeories";

const RootPage = async () => {
  const categories = await prisma.category.findMany();
  return (
    <div className="p-3 space-y-4 h-full">
      <SearchInput />
      <Categories data={categories} />
    </div>
  );
};

export default RootPage;
