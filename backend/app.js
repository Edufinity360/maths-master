import express from "express";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import liveClassRoute from "./routes/liveClassRoute.js";
import noteRoutes from "./routes/noteRoute.js";
import adminRoute from "./routes/adminRoute.js";
import recordingRoute from "./routes/recordingRoute.js"
import adminAuthRoute from "./routes/adminAuthRoute.js";
import { sendEmail } from "./utils/sendEmail.js";
import cron from "node-cron";
import { paymentFollowupJob } from "./jobs/paymentFollowupJob.js";
import { classReminderJob } from "./jobs/classReminderJob.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Maths Master Backend Running...");
});
app.get("/api/test-email", async (req, res) => {
  const success = await sendEmail({
    to: "kapil8657159531@gmail.com",
    subject: "Maths Master Test Email ✅",
    html: `
      <h2>Hello 👋</h2>
      <p>This is a test email from <b>Maths Master</b>.</p>
      <p>If you received this, Brevo setup is working 🎉</p>
    `
  });

  res.json({ success });
});
app.use("/api/student", studentRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api", liveClassRoute);
app.use("/api/notes", noteRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRoute);
app.use("/api/recordings", recordingRoute);
app.use("/api/admin-auth", adminAuthRoute);
// 🔁 PAYMENT FOLLOW-UP (हर 1 घंटे)
cron.schedule("0 * * * *", async () => {
  await paymentFollowupJob();
});
// ⏰ CLASS REMINDER — EVERY 5 MIN
cron.schedule("*/5 * * * *", async () => {
  await classReminderJob();
});
export default app;