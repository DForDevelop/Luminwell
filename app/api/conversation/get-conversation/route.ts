import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnection from "@/lib/dbConnection";

// Register models (important)
import ConversationModel from "@/model/Conversation";
import "@/model/Messages"; // <-- ensures Messages schema is loaded

export async function GET() {
  await dbConnection();

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user._id;

    // Fetch conversations where the logged-in user is a participant
    const conversations = await ConversationModel.find({
      participants: { $in: [userId] },
    })
      .populate({
        path: "participants",
        select: "_id username avatar role",
      })
      .populate({
        path: "lastMessage",
        select: "_id text sender receiver createdAt",
      })
      .sort({ updatedAt: -1 });

    return NextResponse.json({ success: true, conversations }, { status: 200 });
  } catch (error) {
    console.error("Error in get-conversation route:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
