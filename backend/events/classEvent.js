/ backend/events/classEvents.js

import { sendClassScheduledMail } from "../services/emailService.js";

export const classScheduledEvent = async (student, liveClass) => {
  await sendClassScheduledMail({
    email: student.email,
    name: student.name,
    subject: liveClass.subject,
    date: liveClass.date,
    time: liveClass.time
  });
};