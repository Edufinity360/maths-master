// backend/services/emailService.js

import { sendEmail } from "../utils/sendEmail.js";
import {
  welcomeEmail,
  paymentPendingEmail,
  classScheduledEmail
} from "../utils/emailTemplates.js";

export const sendWelcomeMail = async (user) => {
  const { subject, html } = welcomeEmail(user);
  return sendEmail({ to: user.email, subject, html });
};

export const sendPaymentPendingMail = async (data) => {
  const { subject, html } = paymentPendingEmail(data);
  return sendEmail({ to: data.email, subject, html });
};

export const sendClassScheduledMail = async (data) => {
  const { subject, html } = classScheduledEmail(data);
  return sendEmail({ to: data.email, subject, html });
};