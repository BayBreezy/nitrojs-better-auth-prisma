import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/smtp-transport";

/**
 * Get the SMTP transporter using the runtime config.
 */
export const getTransporter = () => {
  const config = useRuntimeConfig();
  return nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: Number(config.SMTP_PORT),
    secure: Number(config.SMTP_PORT) == 465,
    from: config.SMTP_FROM,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });
};

/**
 * Send an email using the SMTP configuration from the runtime config.
 */
export const sendEmail = async (data: MailOptions) => {
  const transporter = getTransporter();
  const config = useRuntimeConfig();
  await transporter.sendMail({ ...data, from: config.SMTP_FROM, replyTo: config.SMTP_USER });
};
