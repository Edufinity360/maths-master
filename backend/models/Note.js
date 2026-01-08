import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  class: { type: String, required: true },
  board: { type: String, required: true },
  courseType: { type: String, required: true }, // Crash / Regular
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Note", noteSchema);