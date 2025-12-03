import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnection from "@/lib/dbConnection";
import MessagesModel from "@/model/Messages";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ conversationId: string }> }
) {
  await dbConnection();

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // console.log("Params received:", params);

    const { conversationId } = await params;

    const messages = await MessagesModel.find({ conversationId })
      .populate("sender", "_id username avatar")
      .populate("receiver", "_id username avatar")
      .sort({ createdAt: 1 });

    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
