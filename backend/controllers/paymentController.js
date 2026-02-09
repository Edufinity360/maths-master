import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import axios from "axios";
import Student from "../models/studentModel.js";
import { sendPaymentSuccessMail } from "../services/paymentEmailService.js";

dotenv.config();

// Razorpay init
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// =======================
// CREATE ORDER
// =======================
export const createOrder = async (req, res) => {
  try {
    const { amount, email } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount missing",
      });
    }

    // start pending timer
    if (email) {
      await Student.findOneAndUpdate(
        { email },
        {
          isPaid: false,
          paymentPendingAt: new Date(),
          paymentRemindersSent: 0,
          monthlyReminderSentCount: 0,
          nextDueDate: null,
        }
      );
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "MM_" + Date.now(),
    });

    return res.json({ success: true, order });

  } catch (err) {
    console.log("❌ Order Error:", err);
    return res.status(500).json({
      success: false,
      message: "Order error",
    });
  }
};

// =======================
// VERIFY PAYMENT
// =======================
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment details incomplete",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email missing",
      });
    }

    // signature verify
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.log("❌ Signature mismatch");
      return res.status(400).json({
        success: false,
        message: "Verification error",
      });
    }

    // mark student paid
   // ✅ PAYMENT SUCCESS
const student = await Student.findOneAndUpdate(
  { email },
  {
    isPaid: true,
    paymentPendingAt: null,
    paymentRemindersSent: 0,
  },
  { new: true }
);

// 🔥 fetch real Razorpay amount
const order = await razorpay.orders.fetch(razorpay_order_id);
const amountPaid = order.amount / 100;

// 🔥 create invoice
await axios.post("http://localhost:6002/api/billing/invoice", {
  name: student.name,
  email: student.email,
  course: student.courseType,
  amount: amountPaid,
});

// success mail
await sendPaymentSuccessMail(student, amountPaid);
    console.log("✅ PAYMENT VERIFIED for:", email);

    return res.json({
      success: true,
      redirect: "/payment-success",
    });

  } catch (err) {
    console.log("❌ VERIFY ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};