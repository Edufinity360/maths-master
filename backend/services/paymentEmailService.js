// backend/services/paymentEmailService.js

import { sendEmail } from "../utils/sendEmail.js";
import {
  paymentSuccessTemplate,
  paymentPendingEmail,
  paymentPendingFollowupEmail,
  paymentCancelledEmail,
} from "../utils/emailTemplates.js";

// ✅ PAYMENT SUCCESS
export const sendPaymentSuccessMail = async ({
  email,
  name,
  amount,
  course,
  studentClass,
}) => {
  await sendEmail({
    to: email,
    subject: paymentSuccessTemplate({ name, amount }).subject,
    html: paymentSuccessTemplate({
      name,
      amount,
      course,
      studentClass,
    }).html,
  });
};

// ❌ PAYMENT CANCELLED
export const sendPaymentCancelledMail = async ({
  email,
  amount,
  course,
  studentClass,
}) => {
  await sendEmail({
    to: email,
    subject: paymentCancelledEmail({
      amount,
      course,
      studentClass,
    }).subject,
    html: paymentCancelledEmail({
      amount,
      course,
      studentClass,
    }).html,
  });
};

// ⚠️ PAYMENT PENDING
export const sendPaymentPendingMail = async ({
  email,
  name,
  amount,
  course,
  studentClass,
  dueDate,
}) => {
  await sendEmail({
    to: email,
    subject: paymentPendingEmail({
      name,
      amount,
      course,
      studentClass,
      dueDate,
    }).subject,
    html: paymentPendingEmail({
      name,
      amount,
      course,
      studentClass,
      dueDate,
    }).html,
  });
};