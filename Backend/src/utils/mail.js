import nodemailer from "nodemailer";
export const sendMail = async (email, subject, template) => {
  const config = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
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
};