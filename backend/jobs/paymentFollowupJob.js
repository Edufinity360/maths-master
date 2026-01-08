import Student from "../models/studentModel.js";
import { sendPaymentPendingMail } from "../services/paymentEmailService.js";

export const paymentFollowupJob = async () => {
  const now = new Date();

  // 🔥 3 HOURS
  const threeHoursAgo = new Date(now - 3 * 60 * 60 * 1000);

  // 🔥 24 HOURS
  const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);

  const students = await Student.find({
    isPaid: false,
    createdAt: { $lte: oneDayAgo }, // 24 hr tak ke
  });

  for (const student of students) {
    await sendPaymentPendingMail({
      email: student.email,
      name: student.name,
      amount: "Unpaid",
      course: student.courseType,
      studentClass: student.class,
    });

    console.log("📩 FOLLOW-UP MAIL:", student.email);
  }
};