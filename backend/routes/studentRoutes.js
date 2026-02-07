import express from "express";
import {
  registerStudent,
  loginStudent,
  markAsPaid,
  getStudentProfile,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.put("/markPaid", markAsPaid);
router.get("/profile", getStudentProfile);

export default router;