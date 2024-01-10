import SearchInput from "@/components/SearchInput";
import prisma from "@/lib/Prisma";
import Categories from "@/components/Catgeories";
import { Companions } from "@/components/companions";

const RootPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    categoryId?: string;
  };
}) => {
  const query = searchParams?.query;
  const categoryId = searchParams?.categoryId;

  const companionData = await prisma.companion.findMany({
    where: {
      categoryId: categoryId,
      name: {
        search: query,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await prisma.category.findMany();
  return (
    <div className="p-3 space-y-4 h-full">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={companionData} />
    </div>
  );
};

export default RootPage;
