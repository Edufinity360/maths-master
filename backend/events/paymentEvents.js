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
  amount,
  course,
  studentClass,
}) => {
  await sendEmail({
    to: email,
    subject: "✅ Payment Successful | Maths Master",
    html: paymentSuccessTemplate({
      name: email.split("@")[0],
      amount,
      course,
      studentClass,
    }),
  });
};

// ⚠️ PAYMENT PENDING
export const sendPaymentPendingMail = async ({
  email,
  amount,
  course,
  studentClass,
  dueDate,
}) => {
  await sendEmail({
    to: email,
    subject: "⚠️ Payment Pending | Maths Master",
    html: paymentPendingEmail({
      name: email.split("@")[0],
      amount,
      course,
      studentClass,
      dueDate,
    }),
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
    subject: "❌ Payment Failed | Maths Master",
    html: paymentCancelledEmail({
      name: email.split("@")[0],
      amount,
      course,
      studentClass,
    }),
  });
};

// ⏰ FOLLOW-UP
export const sendPaymentFollowupMail = async ({
  email,
  amount,
  course,
  studentClass,
  dueDate,
}) => {
  await sendEmail({
    to: email,
    subject: "⏰ Payment Reminder | Maths Master",
    html: paymentPendingFollowupEmail({
      name: email.split("@")[0],
      amount,
      course,
      studentClass,
      dueDate,
    }),
  });
};