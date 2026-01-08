import LiveClass from "../models/LiveClass.js";
import Student from "../models/studentModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { classScheduledEmail } from "../utils/emailTemplates.js";

export const classReminderJob = async () => {
  try {
    const now = new Date();
    const thirtyMinLater = new Date(now.getTime() + 30 * 60 * 1000);

    // 🔍 30 min baad start hone wali classes
    const upcomingClasses = await LiveClass.find({
      startTime: {
        $gte: now,
        $lte: thirtyMinLater,
      },
      isActive: true,
      reminderSent: { $ne: true },
    });

    for (const liveClass of upcomingClasses) {
      const students = await Student.find({
        class: liveClass.class,
        board: liveClass.board,
        courseType: liveClass.courseType,
        isPaid: true,
      });

      for (const student of students) {
        await sendEmail({
          to: student.email,
          ...classScheduledEmail({
            name: student.name,
            course: liveClass.courseType,
            board: liveClass.board,
            date: new Date(liveClass.startTime).toLocaleDateString(),
            time: new Date(liveClass.startTime).toLocaleTimeString(),
            joinLink: liveClass.joinLink,
          }),
        });
      }

      // ❌ dobara mail na jaye
      liveClass.reminderSent = true;
      await liveClass.save();

      console.log("⏰ 30 MIN REMINDER SENT:", liveClass._id);
    }
  } catch (err) {
    console.error("❌ CLASS REMINDER JOB ERROR:", err);
  }
};