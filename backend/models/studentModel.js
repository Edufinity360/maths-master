import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  class: String,
  courseType: String,
  board: String,

  batch: {
    type: Number,
    default: 1,
  },

  isPaid: {
    type: Boolean,
    default: false,
  },

  pendingMailSent: {
    type: Boolean,
    default: false,
  },

}, { timestamps: true });

export default mongoose.model("Student", studentSchema);