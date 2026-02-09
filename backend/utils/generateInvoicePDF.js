import PDFDocument from "pdfkit";
import fs from "fs";

export const generateInvoicePDF = (invoice, filePath) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text("Math Master Invoice", { align: "center" });

    doc.moveDown();
    doc.fontSize(12).text(`Invoice #: ${invoice.invoiceNumber}`);
    doc.text(`Student: ${invoice.name}`);
    doc.text(`Email: ${invoice.email}`);
    doc.text(`Course: ${invoice.course}`);
    doc.text(`Amount: ₹${invoice.amount}`);
    doc.text(`Status: ${invoice.status}`);

    doc.end();

    resolve(filePath);
  });
};