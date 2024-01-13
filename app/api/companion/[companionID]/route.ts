import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs";
import prisma from "@/lib/Prisma";
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function PATCH(
  req: Request,
  { params }: { params: { companionID: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params.companionID) {
      return new NextResponse("Companion Id is reqquired", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    const companion = await prisma.companion.update({
      where: { id: params.companionID, userId: user.id },
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });
    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { companionID: string } }
) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!params.companionID) {
    return new NextResponse("Compannion Id is required!", { status: 500 });
  }

  try {
    await prisma.companion.delete({
      where: {
        id: params.companionID,
        userId: userId,
      },
    });
    return NextResponse.json({ status: "success" });
  } catch (err) {
    return new NextResponse("Internal Server Error");
  }
}
