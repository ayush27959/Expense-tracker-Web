import dotenv from "dotenv";

dotenv.config();

export const sendMail = async (email, subject, template) => {
  if (!process.env.RESEND_API_KEY || !process.env.SENDER_EMAIL) {
    throw new Error("RESEND_API_KEY and SENDER_EMAIL are required");
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