import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnection from "@/lib/dbConnection";
import ConversationModel from "@/model/Conversation";

export async function POST(req: Request) {
  await dbConnection();
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const currentUserId = session.user._id;
    const { participantId } = await req.json();

    if (!participantId) {
      return NextResponse.json(
        { success: false, message: "Participant ID is required" },
        { status: 400 }
      );
    }

    let conversation = await ConversationModel.findOne({
      participants: { $all: [currentUserId, participantId] },
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [currentUserId, participantId],
      });
    }

    return NextResponse.json({
      success: true,
      conversationId: conversation._id,
    });
  } catch (error) {
    console.error("Error in conversation route:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
