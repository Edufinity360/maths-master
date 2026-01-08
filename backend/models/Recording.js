import mongoose from "mongoose";

const recordingSchema = new mongoose.Schema(
  {
    title: String,
    link: String,
    class: String,
    board: String,
    courseType: String,
  },
  { timestamps: true }
);

export default mongoose.model("Recording", recordingSchema);