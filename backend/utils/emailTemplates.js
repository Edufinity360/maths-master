const baseTemplate = ({ title, content, footerNote = "" }) => `
  <div style="background:#F8FAFC;padding:30px 0;">
    <div style="
      max-width:600px;
      margin:auto;
      background:#ffffff;
      border-radius:10px;
      overflow:hidden;
      font-family:Arial, sans-serif;
      box-shadow:0 4px 12px rgba(0,0,0,0.08);
    ">

      <!-- HEADER -->
      <div style="background:#2563EB;padding:20px;text-align:center;">
        <h1 style="color:#ffffff;margin:0;">Maths Master</h1>
        <p style="color:#DBEAFE;margin:5px 0 0;">Smart Learning Platform</p>
      </div>

      <!-- BODY -->
      <div style="padding:30px;color:#1F2937;">
        <h2 style="margin-top:0;">${title}</h2>
        ${content}
      </div>

      <!-- FOOTER -->
      <div style="background:#F1F5F9;padding:15px;text-align:center;font-size:13px;color:#475569;">
        ${footerNote || "This is an automated email. Please do not reply."}
        <br/>
        © ${new Date().getFullYear()} Maths Master
      </div>

    </div>
  </div>
`;


// ✅ WELCOME EMAIL
export const welcomeEmail = ({ name }) => ({
  subject: "🎉 Welcome to Maths Master",
  html: baseTemplate({
    title: `Welcome, ${name}!`,
    content: `
      <p>We are excited to have you onboard.</p>
      <p>Your Maths Master account has been <b style="color:#22C55E;">successfully created</b>.</p>
      <p>You can now access classes, notes, and live sessions.</p>
      <p style="margin-top:20px;"><b>Happy Learning 📘</b></p>
    `
  })
});


// ⚠️ PAYMENT PENDING
export const paymentPendingEmail = ({
  name,
  course,
  studentClass,
  
}) => ({
  subject: "⚠️ Payment Pending | Maths Master",
  html: `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:8px;overflow:hidden">

      <div style="background:#2563eb;color:#fff;padding:20px;text-align:center">
        <h1 style="margin:0">Maths Master</h1>
        <p style="margin:5px 0;font-size:14px">Smart Learning Platform</p>
      </div>

      <div style="padding:24px;color:#111827">
        <h2>Hello ${name},</h2>

        <p style="font-size:16px">
          Your payment is currently 
          <span style="color:#dc2626;font-weight:bold">PENDING</span>.
        </p>

        <table style="width:100%;border-collapse:collapse;margin:20px 0">
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb">Course</td>
            <td style="padding:10px;border:1px solid #e5e7eb"><b>${course}</b></td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb">Class</td>
            <td style="padding:10px;border:1px solid #e5e7eb"><b>${studentClass}</b></td>
          </tr>
          
        </table>
         <div style="text-align:center;margin:30px 0">
  <a href="https://yourdomain.com/login"
     style="
       background:#2563eb;
       color:#ffffff;
       padding:12px 24px;
       text-decoration:none;
       border-radius:6px;
       font-weight:bold;
       display:inline-block;
     ">
     Login & Complete Payment
  </a>
</div>
        <p>
          Please complete the payment to avoid interruption of classes.
        </p>

        <p style="margin-top:30px">
          Regards,<br/>
          <b>Maths Master Team</b>
        </p>
      </div>

      <div style="background:#f9fafb;padding:12px;text-align:center;font-size:12px;color:#6b7280">
        © 2026 Maths Master • This is an automated email
      </div>

    </div>
  </div>
  `
});

// ⏰ PAYMENT FOLLOW-UP
export const paymentPendingFollowupEmail = ({ name, amount, dueDate }) => ({
  subject: "⏰ Payment Reminder | Maths Master",
  html: baseTemplate({
    title: "Payment Reminder",
    content: `
      <p>Hello <b>${name}</b>,</p>

      <p>This is a gentle reminder that your payment is still <b style="color:#EF4444;">pending</b>.</p>

      <p><b>Amount:</b> ₹${amount}</p>
      <p><b>Due Date:</b> ${dueDate}</p>

      <p>Please complete your payment as soon as possible to continue your classes without interruption.</p>
    `
  })
});


// ✅ PAYMENT SUCCESS
export const paymentSuccessTemplate = ({
  name,
  amount,
  course,
  studentClass,
}) => ({
  subject: "✅ Payment Successful | Maths Master",
  html: baseTemplate({
    title: "Payment Successful 🎉",
    content: `
      <p>Hello <b>${name}</b>,</p>

      <p>We have successfully received your payment.</p>

      <table style="width:100%;border-collapse:collapse;margin:20px 0">
        <tr>
          <td style="padding:10px;border:1px solid #e5e7eb">Course</td>
          <td style="padding:10px;border:1px solid #e5e7eb"><b>${course}</b></td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #e5e7eb">Class</td>
          <td style="padding:10px;border:1px solid #e5e7eb"><b>${studentClass}</b></td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #e5e7eb">Amount Paid</td>
          <td style="padding:10px;border:1px solid #e5e7eb">
            <b style="color:#22C55E;">${amount}</b>
          </td>

        </tr>
      </table>
      <div style="margin-top:20px; text-align:center;">
  <a
    href="https://yourdomain.com/login"
    style="
      display:inline-block;
      padding:12px 24px;
      background-color:#22C55E;
      color:#ffffff;
      text-decoration:none;
      font-weight:600;
      border-radius:6px;
    "
  >
    Login to Dashboard
  </a>
</div>
      <p>Your classes are now <b style="color:#22C55E;">active</b>.</p>

      <p>Thank you for choosing Maths Master.</p>
    `,
  }),
});


// 📅 CLASS SCHEDULED
export const classScheduledEmail = ({
  name,
  className,
  course,
  board,
  date,
  time,
}) => ({
  subject: "📚 Class Scheduled | Maths Master",
  html: `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:8px;overflow:hidden">

      <div style="background:#2563eb;color:#fff;padding:20px;text-align:center">
        <h1 style="margin:0">Maths Master</h1>
        <p style="margin:5px 0;font-size:14px">Smart Learning Platform</p>
      </div>

      <div style="padding:24px;color:#111827">
        <h2>Hello ${name}, 👋</h2>

        <!-- 🔁 MESSAGE 1 -->
        <p style="font-size:16px">
          Your class has been <b style="color:#16a34a">successfully scheduled</b>.
          Please login to your dashboard to join the class.
        </p>

        <table style="width:100%;border-collapse:collapse;margin:20px 0">
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb">Class</td>
            <td style="padding:10px;border:1px solid #e5e7eb"><b>${className}</b></td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb">Course</td>
            <td style="padding:10px;border:1px solid #e5e7eb"><b>${course}</b></td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb">Board</td>
            <td style="padding:10px;border:1px solid #e5e7eb"><b>${board}</b></td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb">Date</td>
            <td style="padding:10px;border:1px solid #e5e7eb"><b>${date}</b></td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb">Time</td>
            <td style="padding:10px;border:1px solid #e5e7eb"><b>${time}</b></td>
          </tr>
        </table>

        <!-- 🔘 LOGIN / JOIN BUTTON -->
        <div style="text-align:center;margin:30px 0">
          <a href="https://yourdomain.com/login"
             style="background:#2563eb;color:#fff;
             padding:12px 24px;
             text-decoration:none;
             border-radius:6px;
             font-weight:bold;
             display:inline-block">
            🔑 Login & Join Class
          </a>
        </div>

        <!-- 🔁 MESSAGE 2 (REPEAT) -->
        <p style="font-size:15px">
          ⏰ Please be ready <b>5 minutes before</b> class time and login to your
          dashboard to join the class smoothly.
        </p>

        <p style="margin-top:24px">
          Regards,<br/>
          <b>Maths Master Team</b>
        </p>
      </div>

      <div style="background:#f9fafb;padding:12px;text-align:center;font-size:12px;color:#6b7280">
        © 2026 Maths Master • This is an automated email
      </div>

    </div>
  </div>
  `,
});

// ❌ PAYMENT FAILED / CANCELLED
export const paymentCancelledEmail = ({
  name,
  amount,
  course,
  studentClass
}) => ({
  subject: "❌ Payment Failed | Maths Master",
  html: `
  <div style="background:#F8FAFC;padding:30px 0;">
    <div style="
      max-width:600px;
      margin:auto;
      background:#ffffff;
      border-radius:10px;
      overflow:hidden;
      font-family:Arial, sans-serif;
      box-shadow:0 4px 12px rgba(0,0,0,0.08);
    ">

      <!-- HEADER -->
      <div style="background:#DC2626;padding:20px;text-align:center;">
        <h1 style="color:#ffffff;margin:0;">Maths Master</h1>
        <p style="color:#FEE2E2;margin:5px 0 0;">Payment Status Update</p>
      </div>

      <!-- BODY -->
      <div style="padding:30px;color:#1F2937;">
        <h2 style="margin-top:0;color:#DC2626;">
          Payment Failed / Cancelled
        </h2>

        <p>Hello <b>${name}</b>,</p>

        <p>
          Unfortunately, your recent payment attempt was 
          <b style="color:#DC2626;">not completed</b>.
        </p>

        <table style="width:100%;border-collapse:collapse;margin:20px 0;">
          <tr>
            <td style="padding:10px;border:1px solid #E5E7EB;">Course</td>
            <td style="padding:10px;border:1px solid #E5E7EB;"><b>${course}</b></td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #E5E7EB;">Class</td>
            <td style="padding:10px;border:1px solid #E5E7EB;"><b>${studentClass}</b></td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #E5E7EB;">Amount</td>
            <td style="padding:10px;border:1px solid #E5E7EB;"><b>₹${amount}</b></td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #E5E7EB;">Status</td>
            <td style="padding:10px;border:1px solid #E5E7EB;">
              <b style="color:#DC2626;">Cancelled / Failed</b>
            </td>
          </tr>
        </table>

        <p>
          No amount has been deducted from your account.
        </p>

        <p>
          You can retry the payment anytime to activate your classes.
        </p>

        <p style="margin-top:30px;">
          Regards,<br/>
          <b>Maths Master Team</b>
        </p>
      </div>

      <!-- FOOTER -->
      <div style="background:#F1F5F9;padding:15px;text-align:center;font-size:13px;color:#475569;">
        This is an automated email. Please do not reply.<br/>
        ©️ ${new Date().getFullYear()} Maths Master
      </div>

    </div>
  </div>
  `
});