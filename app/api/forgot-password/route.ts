export const runtime = "nodejs"; // due to email service

import dbConnection from "@/lib/dbConnection";
import UserModel from "@/model/User";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { sendEmail } from "@/helper/sendEmail";
import { sendResetEmail } from "@/emails/sendResetEmail";
import { render } from "@react-email/render";

export async function POST(request: Request) {
  await dbConnection();

  try {
    const { email } = await request.json();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "No user found with this email" },
        { status: 404 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User registered with Google. Password reset not applicable.",
        },
        { status: 400 }
      );
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000); //15 minutes from now

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = tokenExpiry;

    await user.save();

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${user._id}/${resetPasswordToken}`;

    //this is for sending email
    const html = await render(
      sendResetEmail({
        username: user.username,
        resetUrl: resetUrl,
      })
    );

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html,
    });

    return NextResponse.json(
      { success: true, message: "Password reset email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error sending reset email" },
      { status: 500 }
    );
  }
}
