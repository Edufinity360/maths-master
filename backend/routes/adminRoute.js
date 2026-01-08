// backend/routes/adminRoute.js

import express from "express";
import {
  getStudents,
  deleteStudent,
  createHomework,
  getHomework,
  deleteHomework,
  createAdminUser,
  deleteAdminUser,
  getAdmins,
} from "../controllers/adminController.js";

const router = express.Router();

/* ================= STUDENTS ================= */
router.get("/students", getStudents);
router.delete("/students/:id", deleteStudent);

/* ================= HOMEWORK ================= */
router.post("/homework", createHomework);
router.get("/homework", getHomework);
router.delete("/homework/:id", deleteHomework);

/* ================= ADMINS ================= */
router.post("/create", createAdminUser);
router.get("/", getAdmins);
router.delete("/:id", deleteAdminUser);

export default router;