import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,          // smtp.gmail.com
  port: Number(process.env.SMTP_PORT),  // 587
  secure: false,
  auth: {
    user: process.env.SMTP_USER,        // your gmail
    pass: process.env.SMTP_PASS,        // app password
  },
  tls: { rejectUnauthorized: false },
});

(async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP connection successful");
  } catch (err) {
    console.error("❌ SMTP verify failed:", err.message);
  }
})();

export const sendEmail = async (to, subject, html) => {
  console.log("📤 Sending email to:", to);

  const info = await transporter.sendMail({
    from: `"Maths Master" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    html,
  });

  console.log("✅ Email sent:", info.messageId);
  return info;
};
export const sendInvoiceEmail = async (student) => {
  const pdfBuffer = await generateInvoicePDF(student);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: student.email,
    subject: "Your Invoice - Maths Master",
    html: "<h2>Invoice attached</h2>",
    attachments: [
      {
        filename: "invoice.pdf",
        content: pdfBuffer,
      },
    ],
  });
};