import cron from "node-cron";
import Student from "../models/studentModel.js";
import { sendPaymentPendingMail } from "../services/paymentEmailService.js";
import { sendPaymentPendingWhatsApp } from "../services/whatsappService.js";

// 🔁 DAILY CHECK – every day 9 AM
cron.schedule("0 9 * * *", async () => {
  console.log("📆 Monthly payment reminder cron tick");

  const today = new Date();

  const students = await Student.find({
    isPaid: false,
    planType: "monthly",
    nextDueDate: { $ne: null },
  });

  for (const student of students) {
    const dueDate = new Date(student.nextDueDate);

    const diffDays = Math.ceil(
      (dueDate - today) / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 5 && diffDays >= 0) {

      // ✅ EMAIL
      await sendPaymentPendingMail(student);

      // ✅ WHATSAPP
      await sendPaymentPendingWhatsApp({
        name: student.name,
        class: student.class,
        courseType: student.courseType,
        phone: student.phone
      });

      student.monthlyReminderSentCount += 1;
      await student.save();

      console.log(
        `📨 Reminder sent to ${student.email} + WhatsApp | Due in ${diffDays} days`
      );
    }
  }
});