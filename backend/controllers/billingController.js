import Invoice from "../models/Invoice.js";
import { generateInvoicePDF } from "../utils/generateInvoicePDF.js";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export const createInvoice = async (req, res) => {
    console.log("🔥 INVOICE API HIT");
  try {
    const { name, email, course, amount } = req.body;

    const invoice = await Invoice.create({
  name,
  email,
  course,
  amount,
  status: "paid",   // 🔥 add this
  invoiceNumber: "INV-" + Date.now()
});

    // ✅ make sure folder exists
    const folder = "invoices";
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);

    const pdfPath = path.join(folder, `${invoice.invoiceNumber}.pdf`);

    // generate pdf
    await generateInvoicePDF(invoice, pdfPath);
    console.log("PDF PATH:", pdfPath);

    // email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS
}
    });

    // send email with attachment
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your Math Master Invoice",
      text: "Invoice attached below",
      attachments: [
        {
          filename: "invoice.pdf",
          path: pdfPath,
        },
      ],
    });

    res.json({ success: true, invoice });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const markPaid = async (req, res) => {
  const invoice = await Invoice.findByIdAndUpdate(
    req.params.id,
    { status: "paid" },
    { new: true }
  );

  res.json(invoice);
};

export const getInvoices = async (req, res) => {
  const invoices = await Invoice.find().sort({ createdAt: -1 });
  res.json(invoices);
};
export const deleteInvoice = async (req, res) => {
  await Invoice.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};