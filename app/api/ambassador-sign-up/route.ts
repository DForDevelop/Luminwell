import dbConnection from "@/lib/dbConnection";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnection();
  try {
    const { username, email, password, avatar, categories, description } =
      await request.json();
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
      categories,
      description,
      role: "ambassador",
    });
    await newUser.save();
    return NextResponse.json({
      success: true,
      message: "Ambassador Sign-up Successful",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Sign up failed" });
  }
}
