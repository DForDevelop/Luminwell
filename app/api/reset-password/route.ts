import dbConnection from "@/lib/dbConnection";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnection();

  try {
    const { _id, token, password } = await req.json();

    const user = await UserModel.findById(_id);
    const isTokenExpired =
      !user?.resetPasswordExpires ||
      new Date(user.resetPasswordExpires) < new Date();

    if (!user || user.resetPasswordToken !== token || isTokenExpired) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json(
      { success: true, message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, message: "Error resetting password" },
      { status: 500 }
    );
  }
}
