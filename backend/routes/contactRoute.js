import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// save message
router.post("/", async (req, res) => {
  try {
    const msg = await Contact.create(req.body);
    res.json({ success: true, msg });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// get all messages (admin)
router.get("/", async (req, res) => {
  const msgs = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, msgs });
});

export default router;