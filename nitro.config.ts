export default defineNitroConfig({
  srcDir: "server",
  compatibilityDate: "2024-11-28",
  timing: true,
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
