// backend/cron/classReminderCron.js

import cron from "node-cron";
import LiveClass from "../models/LiveClass.js";
import { sendClassReminderMail } from "../services/liveClassEmailService.js";
import { sendClassReminderWhatsApp } from "../services/whatsappService.js"; // ✅ NEW

cron.schedule("* * * * *", async () => {
  console.log("⏰ [CRON] Class reminder tick");

  try {
    const now = new Date();
    const next30Min = new Date(now.getTime() + 30 * 60000);

    const classes = await LiveClass.find({
      startTime: { $gte: now, $lte: next30Min },
      reminderSent: { $ne: true },
      isActive: true,
    });

    console.log("📘 [CRON] Classes found:", classes.length);

    for (const liveClass of classes) {
      console.log("📧 [CRON] Sending reminder for class:", liveClass._id);

      // ✅ EMAIL
      await sendClassReminderMail(liveClass);

      // ✅ WHATSAPP
      try {
        await sendClassReminderWhatsApp(liveClass);
        console.log("📱 WhatsApp reminder sent:", liveClass._id);
      } catch (waErr) {
        console.error("⚠ WhatsApp failed:", waErr.message);
      }

      liveClass.reminderSent = true;
      await liveClass.save();

      console.log("✅ Reminder completed & marked:", liveClass._id);
    }
  } catch (err) {
    console.error("❌ [CRON] Class reminder error:", err.message);
  }
});