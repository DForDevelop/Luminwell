import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnection from "@/lib/dbConnection";
import ConversationModel from "@/model/Conversation";
import MessagesModel from "@/model/Messages";
import mongoose from "mongoose";

export async function POST(req: Request) {
  await dbConnection();

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { conversationId, text } = await req.json();

    if (!conversationId || !text) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const conversation = await ConversationModel.findById(conversationId);

    if (!conversation) {
      return NextResponse.json(
        { message: "Conversation not found" },
        { status: 404 }
      );
    }

    const sender = session.user._id;
    const receiver = conversation.participants.find(
      (participantId: mongoose.Types.ObjectId) =>
        participantId.toString() !== sender
    );

    const newMessage = await MessagesModel.create({
      conversationId,
      sender,
      receiver,
      text,
    });

    await ConversationModel.findByIdAndUpdate(conversationId, {
      lastMessage: newMessage._id,
    });
    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error in send-message route:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
