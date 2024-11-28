import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { magicLink, openAPI, bearer, admin } from "better-auth/plugins";

/**
 * Auth instance
 */
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "mysql" }),
  user: {
    additionalFields: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      phone: { type: "string" },
    },
  },
  appName: "NitroJS Better Auth",
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    async sendVerificationEmail(data, request) {
      await sendEmail({
        to: data.user.email,
        subject: "Verify your email",
        html: `<a href="${data.url}">Click to verify your email</a>`,
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    maxPasswordLength: 50,
    async sendResetPassword(data, request) {
      await sendEmail({
        to: data.user.email,
        subject: "Reset your password",
        html: `<a href="${data.url}">Click to reset your password</a>`,
      });
    },
    requireEmailVerification: true,
  },
  plugins: [
    admin(),
    bearer(),
    openAPI({ path: "/docs" }),
    magicLink({
      async sendMagicLink(data) {
        await sendEmail({
          to: data.email,
          subject: "Log in to your account",
          html: `<a href="${data.url}">Click to log in</a>`,
        });
      },
    }),
  ],
});
