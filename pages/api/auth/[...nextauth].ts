import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

const options = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId:
        process.env.GOOGLE_ID !== undefined ? process.env.GOOGLE_ID : "",
      clientSecret:
        process.env.GOOGLE_SECRET !== undefined
          ? process.env.GOOGLE_SECRET
          : "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }: any) {
      session = {
        ...session,
        user: {
          ...user,
        },
      };
      return session;
    },
  },
  debug: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
};

export default authHandler;
