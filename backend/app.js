import express from "express";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import liveClassRoute from "./routes/liveClassRoute.js";
import noteRoutes from "./routes/noteRoute.js";
import adminRoute from "./routes/adminRoute.js";
import recordingRoute from "./routes/recordingRoute.js"
import adminAuthRoute from "./routes/adminAuthRoute.js";
import { sendEmail } from "./services/emailService.js";
import "./cron/paymentPendingCron.js";
import "./cron/monthlyPaymentReminderCron.js";
import "./cron/classReminderCron.js";
import contactRoute from "./routes/contactRoute.js";

import aiRoute from "./routes/aiRoute.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Maths Master Backend Running...");
});
app.get("/api/test-email", async (req, res) => {
  try {
    await sendEmail(
      "kapil8657159531@gmail.com",
      "Maths Master Test Email ✅",
      "<h2>Hello</h2><p>Brevo SMTP working</p>"
    );

    res.send("Email sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("Email failed");
  }
});
app.use("/api/student", studentRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api", liveClassRoute);
app.use("/api/notes", noteRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRoute);
app.use("/api/recordings", recordingRoute);
app.use("/api/admin-auth", adminAuthRoute);
app.use("/api/ai", aiRoute);
app.use("/api/contact", contactRoute);


export default app;