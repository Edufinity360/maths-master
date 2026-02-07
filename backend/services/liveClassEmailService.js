import Student from "../models/studentModel.js";
import { sendEmail } from "./emailService.js";
import { classReminderEmail } from "../utils/emailTemplates.js";

export const sendClassReminderMail = async (liveClass) => {
  console.log("🟢 [SERVICE] sendClassReminderMail START");

  const students = await Student.find({
    class: liveClass.class,
    board: liveClass.board,
    courseType: liveClass.courseType,
    isPaid: true,
  });

  console.log("👥 Students found:", students.length);

  for (const student of students) {
    console.log("📧 Sending reminder to:", student.email);

    const { subject, html } = classReminderEmail({
      name: student.name,
      className: liveClass.class,
      time: new Date(liveClass.startTime).toLocaleTimeString(),
      joinLink: liveClass.joinLink,
    });

    await sendEmail(student.email, subject, html);
  }

  console.log("✅ [SERVICE] sendClassReminderMail DONE");
};