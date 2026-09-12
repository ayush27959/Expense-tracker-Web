import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Transporter ko function ke bahar rakho taaki har request par re-connect na karna pade
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
  pool: true,
  maxConnections: 3,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export const sendMail = async (email, subject, template) => {
  try {
    if (!process.env.SENDER_EMAIL || !process.env.SENDER_PASSWORD) {
      throw new Error("SENDER_EMAIL and SENDER_PASSWORD are required");
    }

    const options = {
      from: `"Expense Tracker" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: subject,
      html: template,
    };

    await transporter.sendMail(options);
    return true;
  } catch (error) {
    console.error("Nodemailer Send Error:", error);
    throw new Error(`Email could not be sent: ${error.message}`);
  }
};