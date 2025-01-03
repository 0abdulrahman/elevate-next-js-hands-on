import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constant";
import AppError from "./lib/utils/app-error";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });

        const payload: APIResponse<LoginResponse> = await response.json();

        // If login was successful, return the user data alongside the token
        if (payload.status === "success") {
          // Save the token in cookies separately
          cookies().set("e-commerce_token", payload.data.token, {
            httpOnly: true,
          });

          // Return user data alongside the token
          return {
            token: payload.data.token,
            ...payload.data.user,
          };
        }

        // Otherwise, throw the error returned from the backend
        throw new AppError(payload.message, payload.statusCode);
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.token = user.token;
        token.username = user.username;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.fullName = user.fullName;
        token.role = user.role;
        token.photo = user.photo;
        token.blocked = user.blocked;
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.username = token.username;
      session.email = token.email;
      session.firstName = token.firstName;
      session.lastName = token.lastName;
      session.fullName = token.fullName;
      session.role = token.role;
      session.photo = token.photo;
      session.blocked = token.blocked;
      session.id = token.id;

      return session;
    },
  },
};
