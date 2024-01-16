import SearchInput from "@/components/SearchInput";
import prisma from "@/lib/Prisma";
import Categories from "@/components/Catgeories";
import { Companions } from "@/components/companions";
import { Companion } from "@prisma/client";

async function filterCompanion(query: any, categoryId: any) {
  if (query && categoryId) {
    return await prisma.companion.findMany({
      where: {
        categoryId: categoryId,
        name: {
          search: query?.split(" ").join(":* & ") + ":*",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (query) {
    return await prisma.companion.findMany({
      where: {
        name: {
          search: query?.split(" ").join(":* & ") + ":*",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (categoryId) {
    return await prisma.companion.findMany({
      where: {
        categoryId: categoryId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return await prisma.companion.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

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

  const companionData = await filterCompanion(query, categoryId);

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
