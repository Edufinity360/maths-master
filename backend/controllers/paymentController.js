import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
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

    // 🔥 START PAYMENT PENDING TIMER
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
      email,
      amount,
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

    // Signature verify
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    // ❌ PAYMENT FAILED
    if (expectedSignature !== razorpay_signature) {
      console.log("❌ Signature mismatch");
      return res.status(400).json({
        success: false,
        message: "Verification error",
      });
    }

    // ✅ PAYMENT SUCCESS → STOP PENDING REMINDERS
    const student = await Student.findOneAndUpdate(
      { email },
      {
        isPaid: true,
        paymentPendingAt: null,
        paymentRemindersSent: 0,
      },
      { new: true }
    );

    // ✅ SUCCESS MAIL (SERVICE LAYER ONLY)
    await sendPaymentSuccessMail(student, amount);

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