import express from "express";
import {
  addRecording,
  getRecordings,
  deleteRecording,
} from "../controllers/recordingController.js";

const router = express.Router();

router.post("/", addRecording);
router.get("/", getRecordings);
router.delete("/:id", deleteRecording);

export default router;