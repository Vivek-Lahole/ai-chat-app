import { redirect } from "next/navigation";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import prisma from "@/lib/Prisma";
import CreateCompanionForm from "../CreateCompanionForm";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prisma.companion.findUnique({
    where: {
      id: params.companionId,
      userId: userId,
    },
  });

  const categories = await prisma.category.findMany();
  return (
    <CreateCompanionForm initialData={companion} categories={categories} />
  );
};

export default CompanionIdPage;
