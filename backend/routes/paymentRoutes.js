import express from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

/**
 * @route   POST /api/payment/create-order
 * @desc    Create Razorpay order before initiating payment
 * @access  Public
 */
router.post("/create-order", createOrder);

/**
 * @route   POST /api/payment/verify
 * @desc    Verify Razorpay payment and mark student as paid
 * @access  Public
 */
router.post("/verify", verifyPayment);

export default router;