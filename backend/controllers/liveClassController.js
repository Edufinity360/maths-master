import LiveClass from "../models/LiveClass.js";
import Student from "../models/studentModel.js";
import { classScheduledEmail } from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/sendEmail.js";
/**
 * 🔹 GET live classes for student
 * URL: /api/live-classes
 */
export const getLiveClassesForStudent = async (req, res) => {
  try {
    const { class: studentClass, board, courseType } = req.query;

    if (!studentClass || !board) {
      return res.status(400).json({
        success: false,
        message: "class and board are required",
      });
    }

    const query = {
      class: studentClass,
      board,
      isActive: true,
    };

    if (courseType) {
      query.courseType = courseType;
    }

    const classes = await LiveClass.find(query).sort({ startTime: 1 });

    res.json({
      success: true,
      liveClasses: classes,
    });
  } catch (err) {
    console.error("GET LIVE CLASS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * 🔹 CREATE live class
 * 🔹 AUTO BATCH LOGIC (100 students per batch)
 * URL: /api/live-classes
 */
export const createLiveClass = async (req, res) => {
  try {
    const {
      class: studentClass,
      board,
      courseType,
      joinLink,
      startTime,
      endTime,
    } = req.body;

    if (
      !studentClass ||
      !board ||
      !courseType ||
      !joinLink ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ COUNT ONLY PAID STUDENTS
    const paidStudentsCount = await Student.countDocuments({
      class: studentClass,
      board,
      courseType,
      isPaid: true,
    });
   
    // ✅ AUTO BATCH (100 STUDENTS = 1 BATCH)
    const batch = Math.floor(paidStudentsCount / 100) + 1;

    const liveClass = await LiveClass.create({
      class: studentClass,
      board,
      courseType,
      batch,
      joinLink,
      startTime,
      endTime,
      isActive: true,
    });
    console.log("🔥 CLASS CREATED, MAIL BLOCK START");
    // 🔔 SEND CLASS SCHEDULE EMAIL TO PAID STUDENTS
const paidStudents = await Student.find({
  class: studentClass,
  board,
  courseType,
  isPaid: true,
});

console.log("📊 PAID STUDENTS:", paidStudents.length);

for (const student of paidStudents) {
  console.log("📧 MAIL TO:", student.email);

  await sendEmail({
    to: student.email,
    ...classScheduledEmail({
  name: student.name,
  className: studentClass,
  course: courseType,
  board,
  date: new Date(startTime).toLocaleDateString(),
  time: new Date(startTime).toLocaleTimeString(),
})
  });
}
    res.json({
      success: true,
      liveClass,
    });
  } catch (err) {
    console.error("CREATE LIVE CLASS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
/**
 * 🔹 GET ALL LIVE CLASSES (ADMIN)
 * URL: /api/live-classes/admin
 */
export const getAllLiveClassesForAdmin = async (req, res) => {
  try {
    const { class: studentClass, board, courseType } = req.query;

    const query = {};

    if (studentClass) query.class = studentClass;
    if (board) query.board = board;
    if (courseType) query.courseType = courseType;

    const classes = await LiveClass.find(query).sort({ startTime: -1 });

    res.json({
      success: true,
      liveClasses: classes,
    });
  } catch (err) {
    console.error("ADMIN GET LIVE CLASSES ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
/**
 * 🔹 DELETE live class (ADMIN)
 * URL: /api/live-classes/:id
 */
export const deleteLiveClass = async (req, res) => {
  try {
    const { id } = req.params;

    await LiveClass.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Live class deleted",
    });
  } catch (err) {
    console.error("DELETE LIVE CLASS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};