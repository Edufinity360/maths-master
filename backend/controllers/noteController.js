import Note from "../models/Note.js";
import fs from "fs";
import path from "path";

/* ======================
   UPLOAD NOTE
====================== */
export const uploadNote = async (req, res) => {
  try {
    const { title, class: studentClass, board, courseType } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "PDF required" });
    }

    const note = await Note.create({
      title,
      class: studentClass,
      board,
      courseType,
      fileUrl: `/uploads/notes/${req.file.filename}`,
    });

    res.json({ success: true, note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

/* ======================
   GET NOTES (ADMIN / STUDENT)
====================== */
export const getNotes = async (req, res) => {
  try {
    const { class: studentClass, board, courseType } = req.query;

    const filter = {};
    if (studentClass) filter.class = studentClass;
    if (board) filter.board = board;
    if (courseType) filter.courseType = courseType;

    const notes = await Note.find(filter).sort({ uploadedAt: -1 });

    res.json({ success: true, notes });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

/* ======================
   DELETE NOTE
====================== */
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ success: false });

    const filePath = path.join(process.cwd(), note.fileUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await note.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};