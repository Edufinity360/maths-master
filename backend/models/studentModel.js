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

 // 🔥 PAYMENT REMINDER SYSTEM
paymentPendingAt: {
  type: Date,
},

paymentRemindersSent: {
  type: Number,
  default: 0,
},

// 🔥 MONTHLY PAYMENT SYSTEM
nextDueDate: {
  type: Date,
},

monthlyReminderSentCount: {
  type: Number,
  default: 0,
},
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);