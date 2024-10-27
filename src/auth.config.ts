import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { NextResponse } from "next/server";
import { isRoleAllowed } from "./lib/route-permissions";
import { routesRedirectAuth } from "./lib/routes-redirect";
import { UserRole } from "./features/users/interfaces/user.interface";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: {},
        firstName: {},
        lastName: {},
        username: {},
        email: {},
        role: {},
        accessToken: {},
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            id: z.string(),
            firstName: z.string(),
            lastName: z.string(),
            username: z.string(),
            email: z.string(),
            role: z.string(),
            accessToken: z.string(),
          })
          .safeParse(credentials);
        if (!parsedCredentials.success) return null;
        return { ...parsedCredentials.data, emailVerified: null };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.username = user.username;
        token.email = user?.email as string;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.emailVerified = user.emailVerified;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.username = token.username as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string;
        session.user.emailVerified = token.emailVerified as Date | null;
      }
      return session;
    },
    async authorized({ auth, request: { nextUrl, url } }) {
      const { pathname } = nextUrl;
      const user = auth?.user;

      if (pathname === "/login" && user) {
        const redirectPath = routesRedirectAuth[user.role as UserRole];
        if (!redirectPath) return true;
        return NextResponse.redirect(new URL(redirectPath, url));
      }

      if (pathname === "/register" && user) {
        const redirectPath = routesRedirectAuth[user.role as UserRole];
        if (!redirectPath) return true;
        return NextResponse.redirect(new URL(redirectPath, url));
      }

      const routerPermison = isRoleAllowed(pathname, user?.role);
      if (routerPermison.path && pathname !== "/403") {
        if (routerPermison.role) return true;
        if (!user) return false;
        return NextResponse.redirect(new URL("/403", url));
      }

      if (!user && routerPermison.path) return false;

      return true;
    },
  },
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
