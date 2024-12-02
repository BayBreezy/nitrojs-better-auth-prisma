export default defineNitroConfig({
  // See https://www.better-auth.com/docs/concepts/typescript
  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        // Declaration should be false. See https://www.better-auth.com/docs/concepts/typescript#declaration-files
        declaration: false,
        strict: true,
      },
    },
  },
  srcDir: "server",
  compatibilityDate: "2024-11-28",
  timing: true,
  imports: { dirs: ["server/utils"] },
  storage: {
    uploads: { driver: "fs", base: "./uploads" },
    // So you can access the email templates easily that are built by maizzle
    emails: { driver: "fs", base: "./emails" },
  },
  runtimeConfig: {
    SMTP_HOST: "",
    SMTP_PORT: "",
    SMTP_USER: "",
    SMTP_PASS: "",
    SMTP_FROM: "",
  },
});
