import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink, openAPI, bearer, admin } from "better-auth/plugins";
import mustache from "mustache";

/**
 * Auth instance
 */
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "mysql" }),
  user: {
    changeEmail: {
      enabled: true,
      async sendChangeEmailVerification(data) {
        const storage = useStorage("emails");
        const template = await storage.getItem<string>("email-change-verification.html");
        if (!template) throw createError({ status: 404, message: "Email template not found" });
        const html = mustache.render(template, { username: data.user.name, link: data.url });
        await sendEmail({
          to: data.newEmail,
          subject: "A request was made to change your email address. Let us help you get this done",
          html,
        });
      },
    },
    additionalFields: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      phone: { type: "string" },
    },
  },
  appName: "NitroJS Better Auth",
  databaseHooks: {
    user: {
      create: {
        async before(user) {
          return { data: { ...user, email: user?.email?.toLowerCase() } };
        },
      },
      update: {
        async before(user) {
          return { data: { ...user, email: user?.email?.toLowerCase() } };
        },
      },
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    async sendVerificationEmail(data) {
      const storage = useStorage("emails");
      const template = await storage.getItem<string>("verify-account.html");
      if (!template) throw createError({ status: 404, message: "Email template not found" });
      const html = mustache.render(template, { username: data.user.name, link: data.url });
      await sendEmail({
        to: data.user.email,
        subject: "We heard that you would like to verify your account. Let us help you with that.",
        html,
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    maxPasswordLength: 50,
    requireEmailVerification: true,
    async sendResetPassword(data) {
      const storage = useStorage("emails");
      const template = await storage.getItem<string>("forgot-password.html");
      if (!template) throw createError({ status: 404, message: "Email template not found" });
      const html = mustache.render(template, { username: data.user.name, link: data.url });
      await sendEmail({
        to: data.user.email,
        subject: "We heard that you forgot your password. Let us help you with creating a new one.",
        html,
      });
    },
  },
  plugins: [
    admin(),
    bearer(),
    openAPI({ path: "/docs" }),
    magicLink({
      async sendMagicLink(data) {
        const storage = useStorage("emails");
        const template = await storage.getItem<string>("magic-link.html");
        if (!template) throw createError({ status: 404, message: "Email template not found" });
        const html = mustache.render(template, { link: data.url });
        await sendEmail({
          to: data.email,
          subject: "Your Magic Link is now ready. Use it to log into your account immediately!",
          html,
        });
      },
    }),
  ],
});
