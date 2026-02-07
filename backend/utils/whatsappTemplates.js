// WhatsApp message templates
// Pure formatting layer — no API logic

const brand = "Maths Master";
const loginURL = "https://mathsmaster.co.in/login";
const paymentURL = "https://mathsmaster.co.in/payment";

/* ---------------- WELCOME ---------------- */

export const welcomeWhatsApp = ({ name }) => ({
  type: "text",
  message: `
🎉 Welcome to ${brand}, ${name}!

Your account is ready ✅

You can now:
* Attend live classes
* Access notes & recordings
* Track your progress

👉 Login here:
${loginURL}

Happy learning 🚀
${brand} Team
`
});

/* ---------------- PAYMENT PENDING ---------------- */

export const paymentPendingWhatsApp = ({ name, class: className, courseType }) => ({
  type: "text",
  message: `
⚠️ Payment Pending Reminder

Hello ${name},

Your enrollment payment is still pending.

📘 Class: ${className}
🎓 Course: ${courseType}

👉 Complete payment:
${paymentURL}

If already paid, please ignore.

${brand} Support
`
});

/* ---------------- PAYMENT SUCCESS ---------------- */

export const paymentSuccessWhatsApp = ({
  name,
  className,
  courseType,
  amount
}) => ({
  type: "text",
  message: `
🎉 Payment Successful!

Hi ${name},

Your enrollment is confirmed ✅

📘 Class: ${className}
🎓 Course: ${courseType}
💰 Amount: ${amount}

👉 Login to dashboard:
${loginURL}

Welcome aboard 🚀
${brand} Team
`
});

/* ---------------- CLASS SCHEDULED ---------------- */

export const classScheduledWhatsApp = ({
  name,
  className,
  board,
  course,
  date,
  time,
  link
}) => ({
  type: "text",
  message: `
📘 Live Class Scheduled

Hello ${name},

📘 Class: ${className}
🏫 Board: ${board}
🎓 Course: ${course}

📅 Date: ${date}
⏰ Time: ${time}

👉 Join class:
${link}

See you there 🎯
${brand} Team
`
});

/* ---------------- CLASS REMINDER ---------------- */

export const classReminderWhatsApp = ({
  name,
  className,
  date,
  time,
  link
}) => ({
  type: "text",
  message: `
⏰ Class Reminder

Hi ${name},

Your class starts in 30 minutes.

📘 Class: ${className}
📅 Date: ${date}
⏰ Time: ${time}

👉 Join instantly:
${link}

Be ready 🚀
${brand} Team
`
});