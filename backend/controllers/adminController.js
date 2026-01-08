// backend/controllers/adminController.js

import Student from "../models/studentModel.js";
import Homework from "../models/Homework.js";
import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";

/* ================= STUDENTS ================= */
export const getStudents = async (req, res) => {
  try {
    const query = {};

    if (req.query.class) query.class = req.query.class;
    if (req.query.board) query.board = req.query.board;
    if (req.query.courseType) query.courseType = req.query.courseType;

    if (req.query.type === "students") query.isPaid = true;
    if (req.query.type === "leads") query.isPaid = false;

    const students = await Student.find(query).select(
      "name email phone class board courseType isPaid"
    );

    res.json({ success: true, students });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Student deleted successfully" });
  } catch {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

/* ================= HOMEWORK ================= */
export const createHomework = async (req, res) => {
  try {
    const { title, description, class: cls, board, courseType } = req.body;

    if (!title || !description || !cls || !board || !courseType) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const homework = await Homework.create({
      title,
      description,
      class: cls,
      board,
      courseType,
    });

    res.json({ success: true, homework });
  } catch {
    res.status(500).json({ success: false, message: "Homework creation failed" });
  }
};

export const getHomework = async (req, res) => {
  try {
    const query = {};
    if (req.query.class) query.class = req.query.class;
    if (req.query.board) query.board = req.query.board;
    if (req.query.courseType) query.courseType = req.query.courseType;

    const homework = await Homework.find(query).sort({ createdAt: -1 });
    res.json({ success: true, homework });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch homework" });
  }
};

export const deleteHomework = async (req, res) => {
  try {
    await Homework.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Homework deleted successfully" });
  } catch {
    res.status(500).json({ success: false, message: "Homework delete failed" });
  }
};

/* ================= ADMINS ================= */
export const createAdminUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      success: true,
      admin: { _id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error("ADD ADMIN ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteAdminUser = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Admin deleted" });
  } catch {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("name email");
    res.json({ success: true, admins });
  } catch (err) {
    console.error("GET ADMINS ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to fetch admins" });
  }
};