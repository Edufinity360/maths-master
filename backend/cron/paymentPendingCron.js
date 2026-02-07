import cron from "node-cron";
import Student from "../models/studentModel.js";
import { sendPaymentPendingMail } from "../services/paymentEmailService.js";
import { sendPaymentPendingWhatsApp } from "../services/whatsappService.js";

console.log("🔥 PaymentPendingCron LOADED");

// ⏱ TEST MODE (90 sec)
const REMINDERS = [
  { seconds: 90 },
  { hours: 3 },
  { hours: 24 },
  { days: 3 },
  { days: 7 },
  { days: 14 },
  { days: 21 },
  { days: 28 },
];

const timePassed = (from, rule) => {
  let target = new Date(from).getTime();

  if (rule.seconds) target += rule.seconds * 1000;
  if (rule.hours) target += rule.hours * 60 * 60 * 1000;
  if (rule.days) target += rule.days * 24 * 60 * 60 * 1000;

  return Date.now() >= target;
};

// 🔁 RUN EVERY 1 MIN
cron.schedule("* * * * *", async () => {
  try {
    console.log("⏱ PaymentPendingCron tick");

    const students = await Student.find({
      isPaid: false,
      paymentPendingAt: { $ne: null },
    });

    console.log("👥 Pending students found:", students.length);

    for (const student of students) {
      const sentCount = student.paymentRemindersSent || 0;

      console.log(`➡️ Checking ${student.email} | sentCount=${sentCount}`);

      if (sentCount >= REMINDERS.length) continue;

      const shouldSend = timePassed(
        student.paymentPendingAt,
        REMINDERS[sentCount]
      );

      if (!shouldSend) continue;

      // ✅ EMAIL
      await sendPaymentPendingMail(student);

      // ✅ WHATSAPP
      await sendPaymentPendingWhatsApp({
        name: student.name,
        class: student.class,
        courseType: student.courseType,
        phone: student.phone
      });

      student.paymentRemindersSent = sentCount + 1;
      await student.save();

      console.log(
        `📨 Reminder ${sentCount + 1} sent (Email + WhatsApp) → ${student.email}`
      );
    }
  } catch (err) {
    console.error("❌ PaymentPendingCron ERROR:", err.message);
  }
});