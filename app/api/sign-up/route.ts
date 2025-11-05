import dbConnection from "@/lib/dbConnection";
import bcrypt from "bcryptjs";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnection();

  try {
    const { username, email, password, avatar } = await request.json();
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      avatar: avatar || null,
    });

    await newUser.save();
    return NextResponse.json({ success: true, message: "Sign-up Successful" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Sign up failed" });
  }
}
