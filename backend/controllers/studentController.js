import Student from "../models/studentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { welcomeEmail } from "../utils/emailTemplates.js";
import { sendEmail } from "../services/emailService.js";

// ===================== REGISTER STUDENT =====================
export const registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      class: studentClass,
      courseType,
      board,
      paymentPlan,
    } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
const newStudent = new Student({
  name,
  email,
  phone,
  password: hashedPassword,
  class: studentClass,
  board,
  courseType,
  paymentPlan,

  // 🔥 PAYMENT PENDING SYSTEM (MISSING THA)
  isPaid: false,
  paymentPendingAt: new Date(),      // 👈 YAHI MAIN CHEEZ
  paymentRemindersSent: 0,
});

    await newStudent.save();
    
    // ===== EMAIL SEND (FORCED AWAIT) =====
    try {
      const template = welcomeEmail({ name });

      let subject = "Welcome to Maths Master 🎉";
      let html = "";

      if (typeof template === "string") html = template;
      else {
        subject = template.subject || subject;
        html = template.html || "";
      }

      await sendEmail(email, subject, html);
    } catch (mailErr) {
      console.log("EMAIL ERROR:", mailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Student registered! Continue to payment.",
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ===================== LOGIN =====================
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

    if (student.isPaid) {
      const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET || "secretKey", {
        expiresIn: "7d",
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        student,
        token,
      });
    }

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

// ===================== MARK PAID =====================
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
      message: "Payment successful",
      student,
    });
  } catch (error) {
    console.error("MARK PAID ERROR:", error);
    return res.status(500).json({ success: false, message: "Error marking payment" });
  }
};

// ===================== PROFILE =====================
export const getStudentProfile = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, student });
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};