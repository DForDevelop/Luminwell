import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnection from "@/lib/dbConnection";
import UserModel from "@/model/User";
import { User } from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any): Promise<any> {
        await dbConnection();
        try {
          const user = (await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          })) as User | null;

          if (!user) {
            throw new Error("404 Not Found");
          }

          if (!user.password) {
            throw new Error("User has no password.");
          }

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isMatch) {
            throw new Error("Invalid Password");
          }

          const isAmbassador = user.email.endsWith("@luminwell.ca");

          if (isAmbassador) {
            return {
              _id: user._id.toString(),
              username: user.username,
              email: user.email,
              avatar: user.avatar,
              role: "ambassador",
              categories: user.categories,
              description: user.description,
            };
          } else {
            return {
              _id: user._id.toString(),
              username: user.username,
              email: user.email,
              avatar: user.avatar,
              role: "user",
              credit: user.credit ?? 0,
            };
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.avatar = user.avatar;
        token.role = user.role;
        if (user.role === "ambassador") {
          token.categories = user.categories;
          token.description = user.description;
        } else {
          token.credit = user.credit;
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
