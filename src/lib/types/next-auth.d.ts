/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends DatabaseFields {
    token: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    role: string;
    photo?: string;
    blocked: boolean;
    id: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    role: string;
    photo?: string;
    blocked: boolean;
    id: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    token: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    role: string;
    photo?: string;
    blocked: boolean;
    id: string;
  }
}
