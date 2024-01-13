import { auth, redirectToSignIn } from "@clerk/nextjs";
import prisma from "@/lib/Prisma";
import { ChatClient } from "../../../../../components/CompanionChat/ChatClient";

const ChatPage = async ({ params }: { params: { chatID: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prisma.companion.findUnique({
    where: {
      id: params.chatID,
    },

    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId: userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) {
    return redirectToSignIn();
  }

  return <ChatClient companion={companion}></ChatClient>;
};

export default ChatPage;
