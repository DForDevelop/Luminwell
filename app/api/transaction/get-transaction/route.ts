import dbConnection from "@/lib/dbConnection";
import TransactionModel from "@/model/Transaction";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET() {
  try {
    await dbConnection();

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json({ success: false, message: "Unauthorised" });
    }

    const userId = session.user._id;

    let transactions = [];

    //return user booking{
    transactions = await TransactionModel.find({
      userId,
      status: { $in: ["success", "failed"] },
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ success: true, transactions });
  } catch (error) {
    console.error("Booking fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
