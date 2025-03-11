import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Bu basit bir örnek, gerçek uygulamada veritabanı kontrolü yapılmalıdır
        if (
          credentials?.username === "admin" &&
          credentials?.password === "123456"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@example.com",
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 