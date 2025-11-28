import { NextAuthOptions, User as NextAuthUser } from "next-auth"; // Import NextAuthUser for authorize return type
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnection from "@/lib/dbConnection";
import UserModel from "@/model/User";
import { User } from "@/model/User"; // Your Mongoose User model interface

// Define a type for the credentials object
interface Credentials {
  email?: string;
  password?: string;
  // NextAuth combines email/username into an 'identifier' field
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      // 1. Replaced 'any' with 'Credentials' and 'User | null'
      async authorize(
        credentials: Credentials | undefined
      ): Promise<NextAuthUser | null> {
        await dbConnection();
        try {
          if (!credentials) {
            return null;
          }

          const user = (await UserModel.findOne({
            email: credentials.email,
          })) as User | null;

          if (!user) {
            throw new Error("404 Not Found");
          }

          if (!user.password) {
            throw new Error(
              "This account was created with Google. Please use the 'Continue with Google' button."
            );
          }

          const isMatch = await bcrypt.compare(
            credentials.password as string, // Cast as string since it should be present
            user.password
          );

          if (!isMatch) {
            throw new Error("Invalid Password");
          }

          const isAmbassador = user.email.endsWith("@luminwell.ca");

          // The returned object must satisfy the 'User' interface you extended in next-auth.d.ts
          if (isAmbassador) {
            return {
              _id: user._id.toString(),
              username: user.username,
              email: user.email,
              avatar: user.avatar,
              role: "ambassador",
              categories: user.categories,
              description: user.description,
              // Must include all non-optional fields defined in next-auth.d.ts
              credit: user.credit ?? 0,
            } as NextAuthUser;
          } else {
            return {
              _id: user._id.toString(),
              username: user.username,
              email: user.email,
              avatar: user.avatar,
              role: "user",
              credit: user.credit ?? 0,
              // Must include all non-optional fields defined in next-auth.d.ts
              categories: user.categories ?? [],
              description: user.description ?? "",
            } as NextAuthUser;
          }
        } catch (error: unknown) {
          // 2. Replaced 'any' with 'unknown'
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("An unknown authentication error occurred.");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // 3. Removed all '(user as any)' type assertions
    async jwt({ token, user, account }) {
      if (user) {
        await dbConnection();

        if (account?.provider === "credentials") {
          token._id = user._id?.toString() ?? user.id ?? token._id;
          token.username = user.username ?? user.name ?? token.username;
          token.avatar = user.avatar ?? user.image ?? token.avatar;
          token.role = user.role;

          if (user.role === "ambassador") {
            token.categories = user.categories;
            token.description = user.description;
          } else {
            token.credit = user.credit;
          }
          return token;
        }

        if (account?.provider === "google") {
          const dbUser = await UserModel.findOne({ email: user.email });

          if (dbUser) {
            token._id = dbUser._id.toString();
            token.username = dbUser.username;
            token.avatar = dbUser.avatar;
            token.role = dbUser.role;
            token.credit = dbUser.credit;
          }

          return token;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.avatar = token.avatar;
        session.user.role = token.role;

        if (token.role === "ambassador") {
          session.user.categories = token.categories;
          session.user.description = token.description;
        } else {
          session.user.credit = token.credit;
        }
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await dbConnection();

        const userExist = await UserModel.findOne({ email: user.email });

        if (!userExist) {
          await UserModel.create({
            username: profile?.name,
            email: user.email,
            avatar: profile?.image || user.image,
            role: "user",
            authProvider: account.provider,
            credit: 0,
            // Ensure categories and description are included or defaulted for type safety
            categories: [],
            description: "",
          });
        }
      }
      return true;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
