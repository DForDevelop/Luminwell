import dbConnection from "@/lib/dbConnection";
import BookingModel from "@/model/Booking";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET() {
  try {
    await dbConnection();

    const session = await getServerSession(authOptions);

    if (!session?.user?._id || !session.user.role) {
      return NextResponse.json({ success: false, message: "Unauthorised" });
    }

    const userId = session.user._id;
    const role = session.user.role;

    let bookings = [];

    //return user booking
    if (role === "user") {
      bookings = await BookingModel.find({ userId })
        .populate("ambassadorId", "_id username avatar")
        .sort({ appointmentDate: -1 });
    }

    //return ambassador booking
    if (role === "ambassador") {
      bookings = await BookingModel.find({ ambassadorId: userId })
        .populate("userId", "_id username avatar")
        .sort({ appointmentDate: -1 });
    }

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Booking fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
