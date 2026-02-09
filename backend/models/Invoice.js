import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    name: String,
    email: String,
    course: String,
    amount: Number,
    status: { type: String, default: "unpaid" }, // unpaid | paid
    invoiceNumber: String
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);