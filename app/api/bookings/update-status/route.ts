import dbConnection from "@/lib/dbConnection";
import { NextResponse } from "next/server";
import BookingModel from "@/model/Booking";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function PUT(req: Request) {
  try {
    await dbConnection();

    const session = await getServerSession(authOptions);

    if (!session?.user._id || !session.user.role) {
      return NextResponse.json(
        { success: false, message: "Unauthorised" },
        { status: 401 }
      );
    }

    const { bookingId, status } = await req.json();

    if (!bookingId || !status) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    //ensure that only ambassador can update status
    if (session.user.role !== "ambassador") {
      return NextResponse.json(
        { success: false, message: "Only ambassadors can update status" },
        { status: 403 }
      );
    }

    const updateBookingStatus = await BookingModel.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updateBookingStatus) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking status updated",
      booking: updateBookingStatus,
    });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update status" },
      { status: 500 }
    );
  }
}
