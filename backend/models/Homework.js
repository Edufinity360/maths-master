import mongoose from "mongoose";

const homeworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String, // teacher ka textarea text
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    board: {
      type: String,
      required: true,
    },
    courseType: {
      type: String,
      required: true,
      enum: ["Crash", "Regular"],
    },
    createdBy: {
      type: String, // admin / teacher
      default: "admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Homework", homeworkSchema);