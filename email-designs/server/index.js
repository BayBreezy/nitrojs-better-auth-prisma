import nodemailer from "nodemailer";
import fs from "fs";
import { join, dirname } from "path";
import mustache from "mustache";
import { faker } from "@faker-js/faker";
import os from "os";
import { fileURLToPath } from "url";
import { htmlToText } from "nodemailer-html-to-text";
import "dotenv/config";

const __dirname = dirname(fileURLToPath(import.meta.url));

const transporter = nodemailer.createTransport({
  host: process.env.NITRO_SMTP_HOST,
  port: Number(process.env.NITRO_SMTP_PORT),
  secure: Number(process.env.NITRO_SMTP_PORT) === 465,
  from: process.env.NITRO_SMTP_FROM,
  auth: {
    user: process.env.NITRO_SMTP_USER,
    pass: process.env.NITRO_SMTP_PASS,
  },
});

transporter.use("compile", htmlToText());

const templateData = {
  username: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  otp: faker.helpers.fromRegExp(/[0-9]{4}-[0-9]{4}/),
  link: `${faker.internet.url()}?token=${faker.internet.jwt()}`,
  device: os.platform(),
  location: `${faker.location.city()}, ${faker.location.country()}`,
  datetime: faker.date.recent(),
  newEmail: faker.internet.email().toLowerCase(),
  teamName: faker.company.name(),
  organizationName: faker.company.name(),
  inviter: faker.person.fullName(),
  inviterEmail: faker.internet.email().toLowerCase(),
};

const main = async () => {
  // get each file in the folder & loop over each and send the email
  const templates = await fs.promises.readdir(join(__dirname, "../../emails"));
  for (const template of templates) {
    const html = await fs.promises.readFile(join(__dirname, "../../emails", template), "utf8");
    const rendered = mustache.render(html, templateData);
    await transporter.sendMail({
      from: process.env.NITRO_SMTP_FROM,
      to: faker.internet.email().toLowerCase(),
      subject: template.replace(".html", "").replace(/-/g, " "),
      html: rendered,
    });
  }
  console.log("✅ Emails sent successfully");
};

main().catch(console.error);
