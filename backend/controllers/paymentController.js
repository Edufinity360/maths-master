import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import Student from "../models/studentModel.js";
import {
  sendPaymentSuccessMail,
  sendPaymentCancelledMail,
} from "../services/paymentEmailService.js";
dotenv.config();

// Razorpay init
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ success: false, message: "Amount missing" });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "MM_" + Date.now(),
    });
    
    return res.json({ success: true, order });
  } catch (err) {
    console.log("❌ Order Error:", err);
    return res.status(500).json({ success: false, message: "Order error" });
  }
};

// VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
      return res.status(400).json({ success: false, message: "Payment details incomplete" });

    if (!email)
      return res.status(400).json({ success: false, message: "Email missing" });

    // Calculate signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.log("❌ Signature mismatch");
      console.log("🔥 CANCEL BLOCK HIT");
       // ✅ PAYMENT CANCELLED EMAIL — YAHI
  await sendPaymentCancelledMail({
    email,
    amount: req.body.amount,
    course: req.body.course,
    studentClass: req.body.class,
  });

  return res.status(400).json({
    success: false,
    message: "Verification error",
  });
}

   // Update student payment status
const student = await Student.findOneAndUpdate(
  { email },
  { isPaid: true },
  { new: true }
);

// ✅ PAYMENT SUCCESS EMAIL (PERFECT PLACE)
await sendPaymentSuccessMail({
  email: student.email,
  name: student.name,
  amount: "Paid",               // ✅ FIXED
  course: student.courseType,   // ✅ MODEL MATCH
  studentClass: student.class,  // ✅ MODEL MATCH
});

console.log("✅ PAYMENT VERIFIED for:", email);

    // Send redirect URL
    return res.json({
      success: true,
      redirect: "/payment-success", // 🚀 Frontend yahi redirect karega
    });

  } catch (err) {
    console.log("❌ VERIFY ERROR:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};