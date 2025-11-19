import dbConnection from "@/lib/dbConnection";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnection();

  try {
    const { _id, token } = await req.json();
    const user = await UserModel.findById(_id).select(
      "email resetPasswordToken resetPasswordExpires"
    );

    const isTokenExpired =
      !user?.resetPasswordExpires ||
      new Date(user.resetPasswordExpires) < new Date();

    if (!user || user.resetPasswordToken !== token || isTokenExpired) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, email: user.email });
  } catch (error) {
    console.error("Get email error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching email" },
      { status: 500 }
    );
  }
}
