import express from "express";
import multer from "multer";
import { uploadNote, getNotes, deleteNote } from "../controllers/noteController.js";

const router = express.Router();

/* ===== MULTER SETUP ===== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/notes");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ===== ROUTES ===== */
router.post("/", upload.single("file"), uploadNote);
router.get("/", getNotes);
router.delete("/:id", deleteNote);

export default router;