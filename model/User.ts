import { UserRole } from "@/types/role";
import mongoose, { Document, Schema, Types } from "mongoose";

export interface User extends Document {
  _id: Types.ObjectId;
  username?: string;
  email: string;
  password?: string;
  avatar?: string;
  role: UserRole; //this will by schema if email ends with @l
  credit?: number;
  categories?: string[];
  description?: string;
  authProvider: "credentials" | "google" | "microsoft"; // to check which user use which method to log in;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
}

const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      default: null,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/,
        "Please enter a valid email",
      ],
    },
    authProvider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    password: {
      type: String,
      validate: {
        validator: function (value: string) {
          // If user logs in with credentials, password must existSSSSSS
          if (this.authProvider === "credentials") {
            return value && value.length > 0;
          }
          return true; // Google/Microsoft users can skip
        },
      },
    },
    avatar: {
      type: String,
      required: false,
      default: null,
    },
    credit: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["user", "ambassador"],
      default: "user",
      required: true,
    },
    categories: {
      type: [String],
      enum: ["Finance", "Housing", "Digital safety", "Career"],
      required: function (this: User): boolean {
        return this.role === "ambassador";
      },
    },
    description: {
      type: String,
      required: function (this: User): boolean {
        return this.role === "ambassador";
      },
    },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
