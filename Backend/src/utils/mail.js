import nodemailer from"nodemailer";
export const sendMail = async (email, subject, template) => {
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
};