import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import dotenv from "dotenv";


dotenv.config();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseUrl: process.env.BETTER_AUTH_URL!,

  trustedOrigins: [process.env.BASE_URL || "http://localhost:5000"],

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },
  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "STUDENT" },
      status: { type: "string", defaultValue: "ACTIVE" },
    },
  },
  session: {
    cookieName: "skillbridge_session",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    },
    expiresIn: 60 * 60 * 24 * 7,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.role === "TUTOR") {
            await prisma.tutorProfile.create({
              data: {
                userId: user.id,
              },
            });
          }
        },
      },
    },
  },
});
