import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const sendMail = async (email, subject, template) => {
  if (!process.env.SENDER_EMAIL) {
    throw new Error("SENDER_EMAIL is required");
  }

  if (!process.env.RESEND_API_KEY) {
    const config = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    await config.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject,
      html: template,
    });
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Expense Tracker <${process.env.SENDER_EMAIL}>`,
      to: [email],
      subject,
      html: template,
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend API ${response.status}: ${details}`);
  }
};