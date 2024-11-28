export default defineNitroConfig({
  srcDir: "server",
  compatibilityDate: "2024-11-28",
  timing: true,
  storage: {
    uploads: { driver: "fs", base: "./uploads" },
  },
  runtimeConfig: {
    SMTP_HOST: "",
    SMTP_PORT: "",
    SMTP_USER: "",
    SMTP_PASS: "",
    SMTP_FROM: "",
  },
});
