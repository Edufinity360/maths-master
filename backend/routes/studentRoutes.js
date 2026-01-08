import express from "express";
import {
  registerStudent,
  loginStudent,
  markAsPaid,
  getStudentProfile,
} from "../controllers/studentController.js";

const router = express.Router();

// ✅ Register student
// URL: POST http://localhost:6002/api/students/register
router.post("/register", registerStudent);

// ✅ Login student
// URL: POST http://localhost:6002/api/students/login
router.post("/login", loginStudent);

// ✅ Mark student as paid (called after Razorpay success)
// URL: PUT http://localhost:6002/api/students/markPaid
router.put("/markPaid", markAsPaid);
router.get("/profile", getStudentProfile);
export default router;