import { sendEmail } from "./emailService.js";
import { paymentPendingEmail } from "../utils/emailTemplates.js";
import { paymentSuccessEmail } from "../utils/emailTemplates.js";


/**
 * PAYMENT PENDING EMAIL
 * @param {Object} student  // FULL student document from DB
 */
export const sendPaymentPendingMail = async (student) => {
  try {
    if (!student || !student.email) {
      console.error("❌ Student data missing for payment pending email");
      return;
    }

    const { subject, html } = paymentPendingEmail(student);

    await sendEmail(student.email, subject, html);

    console.log("✅ Payment Pending email sent to:", student.email);
  } catch (err) {
    console.error("❌ Payment Pending email failed:", err.message);
  }
};
export const sendPaymentSuccessMail = async (student) => {
  try {
    const { subject, html } = paymentSuccessEmail({
      name: student.name,
      className: student.class,
      courseType: student.courseType,
      amount: "paid",
    });

    await sendEmail(student.email, subject, html);
  } catch (err) {
    console.log("❌ PAYMENT SUCCESS MAIL ERROR:", err.message);
  }
};