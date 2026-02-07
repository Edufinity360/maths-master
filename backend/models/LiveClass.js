import mongoose from "mongoose";

const liveClassSchema = new mongoose.Schema({
  teacherId: String,
  roomId: String,
  class: String,
  board: String,
  courseType: String,
  batch: { type: Number, required: true },
  startTime: Date,
  endTime: Date,
  joinLink: String,
  
  isActive: { type: Boolean, default: true },
  reminderSent: {
  type: Boolean,
  default: false,
},
  attendance: [
    {
      studentId: String,
      joinTime: Date,
      leaveTime: Date,
    }
  ],
  recordings: [
    {
      url: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model("LiveClass", liveClassSchema);