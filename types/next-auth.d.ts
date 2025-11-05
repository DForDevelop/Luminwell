import "next-auth";
import { DefaultSession } from "next-auth";
import { UserRole } from "./role";
declare module "next-auth" {
  interface User {
    _id: string;
    avatar?: string;
    username?: string;
    role: UserRole;
    credit: number;
    categories: string[];
    description: string;
  }

  interface Session {
    user: {
      _id: string;
      avatar?: string;
      username?: string;
      role?: UserRole;
      credit?: number;
      categories: string[];
      description: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    avatar?: string;
    username?: string;
    role?: UserRole;
    credit?: number;
    categories: string[];
    description: string;
  }
}
