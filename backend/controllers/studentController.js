import Student from "../models/studentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { welcomeEmail } from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendPaymentPendingMail } from "../services/paymentEmailService.js";
// ===================== REGISTER STUDENT =====================
export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, phone, class: studentClass, courseType, board, paymentPlan } = req.body;

    console.log("📌 REGISTER HIT BODY:", req.body);

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: "Student already exists" });
    }

    // 🔥 Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      email,
      phone,
      password: hashedPassword,  // 🚀 encrypted password
      class: studentClass,
      board,
      courseType,
      paymentPlan,
      isPaid: false,
    });

    await newStudent.save();
   // ✅ WELCOME EMAIL
await sendEmail({
  to: email,
  ...welcomeEmail({ name })
});

// 🔥 PAYMENT PENDING MAIL — 2 MIN DELAY
setTimeout(async () => {
  const latestStudent = await Student.findOne({ email });

  if (latestStudent && latestStudent.isPaid === false) {
    console.log("⏳ 2 MIN PENDING MAIL SENT");

    await sendPaymentPendingMail({
      email: latestStudent.email,
      name: latestStudent.name,
      amount: "Unpaid",
      course: latestStudent.courseType,
      studentClass: latestStudent.class,
    });
  }
}, 2 * 60 * 1000); // ⏰ 2 minutes

    return res.status(201).json({
      success: true,
      message: "Student registered! Continue to payment."
    });

  } catch (error) {
    console.log("❌ REGISTER ERROR:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ===================== LOGIN STUDENT =====================
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // ---------------------------------------
    // 🔥 Student PAID → success:true  (redirect to portal)
    // ---------------------------------------
    if (student.isPaid === true) {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        student,
        token: jwt.sign({ id: student._id }, "secretKey", { expiresIn: "7d" }),
      });
    }

    // ---------------------------------------
    // 🔥 Student UNPAID → paymentRequired:true (redirect to payment)
    // ---------------------------------------
    return res.status(200).json({
      success: false,
      paymentRequired: true,
      email: student.email,
      board: student.board,
      course: student.courseType,
      message: "Payment pending",
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ===================== PAYMENT SUCCESS — MARK PAID =====================
export const markAsPaid = async (req, res) => {
  try {
    const { email } = req.body;

    const student = await Student.findOneAndUpdate(
      { email },
      { isPaid: true },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Payment successful — Access unlocked",
      student,
    });

  } catch (error) {
    console.error("MARK PAID ERROR:", error);
    return res.status(500).json({ success: false, message: "Error marking payment" });
  }
};

// ===================== GET STUDENT PROFILE =====================
export const getStudentProfile = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, student });
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};