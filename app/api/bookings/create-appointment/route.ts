import { getServerSession } from "next-auth";
import dbConnection from "@/lib/dbConnection";
import BookingModel from "@/model/Booking";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnection();

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json(
        { success: false, message: "Unauthorised" },
        { status: 401 }
      );
    }

    const { ambassadorId, reason, appointmentDate } = await req.json();

    if (!ambassadorId || !reason || !appointmentDate) {
      console.log("this is the error");
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const appointment = new Date(appointmentDate);

    // Prevent booking past dates
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (appointment < now) {
      return Response.json(
        { error: "Past dates cannot be booked" },
        { status: 400 }
      );
    }

    const newAppointment = await BookingModel.create({
      userId: session.user._id,
      ambassadorId,
      appointmentDate: appointment,
      reason,
      status: "pending",
    });

    return NextResponse.json(
      { success: true, message: "Appointment booked successfully" },
      { status: 201 }
    );
    //at the end send Email for confirmation
  } catch (error) {
    console.error("An error ocurred", error);
    return NextResponse.json(
      { success: false, message: "An error occured during booking" },
      { status: 500 }
    );
  }
}
