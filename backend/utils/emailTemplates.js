export const welcomeEmail = ({ name }) => ({
  subject: "Welcome to Maths Master 🎉",
  html: `
  <div style="font-family: Arial, Helvetica, sans-serif; background:#f4f6f8; padding:30px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden;">

      <!-- Header -->
      <div style="background:#1e40af; color:#ffffff; padding:20px; text-align:center;">
        <h1 style="margin:0;">Maths Master</h1>
        <p style="margin:5px 0 0;">Your Learning Journey Starts Here</p>
      </div>

      <!-- Body -->
      <div style="padding:30px; color:#333;">
        <h2 style="margin-top:0;">Welcome, ${name} 👋</h2>

        <p>
          We’re excited to have you onboard with <strong>Maths Master</strong>.
          Your account has been created successfully.
        </p>

        <p>
          You can now:
        </p>

        <ul style="padding-left:20px;">
          <li>Attend live & recorded classes</li>
          <li>Access notes and practice material</li>
          <li>Track your progress easily</li>
        </ul>

        <div style="text-align:center; margin:30px 0;">
          <a href="https://mathsmaster.co.in/login"
             style="background:#1e40af; color:#ffffff; padding:12px 24px;
                    text-decoration:none; border-radius:6px; display:inline-block;">
            Login to Your Account
          </a>
        </div>

        <p>
          If you have any questions, feel free to reach out to our support team.
        </p>

        <p style="margin-top:30px;">
          Happy Learning! 🚀<br/>
          <strong>Maths Master Team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#555;">
        © ${new Date().getFullYear()} Maths Master. All rights reserved.
      </div>

    </div>
  </div>
  `
});
export const paymentPendingEmail = (student) => ({
  subject: "⚠️ Payment Pending – Complete Your Enrollment",
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Payment Pending</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:20px;">
    <tr>
      <td align="center">

        <!-- CARD -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:#0f172a;padding:24px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:26px;letter-spacing:0.5px;">
                Maths Master
              </h1>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:32px;color:#111827;">
              <h2 style="margin-top:0;color:#dc2626;">
                Payment Pending
              </h2>

              <p style="font-size:15px;line-height:1.6;color:#374151;">
                Hello <strong>${student.name}</strong>,
              </p>

              <p style="font-size:15px;line-height:1.6;color:#374151;">
                We noticed that your payment for the following enrollment is still pending.
                To avoid interruption in access, please complete your payment at the earliest.
              </p>

              <!-- DETAILS BOX -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:20px 0;">
                <tr>
                  <td style="padding:14px;font-size:14px;">
                    <strong>Class:</strong> ${student.class}
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px;font-size:14px;">
                    <strong>Course:</strong> ${student.courseType}
                  </td>
                </tr>
                <tr>
  <td style="padding:14px;font-size:14px;">
    <strong>Status:</strong> Payment Pending
  </td>
</tr>
              </table>

              <!-- CTA -->
              <div style="text-align:center;margin:30px 0;">
                <a href="https://mathsmaster.co.in/payment"
                   style="
                     background:#2563eb;
                     color:#ffffff;
                     text-decoration:none;
                     padding:14px 28px;
                     border-radius:6px;
                     font-size:16px;
                     font-weight:600;
                     display:inline-block;
                   ">
                  Complete Payment
                </a>
              </div>

              <p style="font-size:14px;color:#6b7280;line-height:1.6;">
                If you have already completed the payment, please ignore this message.
              </p>

              <p style="font-size:14px;color:#6b7280;line-height:1.6;">
                For any assistance, feel free to contact our support team.
              </p>

              <p style="font-size:14px;color:#111827;">
                Regards,<br/>
                <strong>Maths Master Team</strong>
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#6b7280;">
              © ${new Date().getFullYear()} Maths Master. All rights reserved.
            </td>
          </tr>

        </table>
        <!-- END CARD -->

      </td>
    </tr>
  </table>

</body>
</html>
`
});
export const paymentSuccessEmail = ({
  name,
  className,
  courseType,
  amount,
}) => ({
  subject: "🎉 Payment Successful – Welcome to Maths Master",
  html: `
  <div style="font-family:Inter,Arial,Helvetica,sans-serif;background:#f3f4f6;padding:40px 0;">
    <div style="max-width:620px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.08);">

      <!-- HEADER -->
      <div style="background:linear-gradient(135deg,#2563eb,#1e40af);padding:28px;text-align:center;color:#ffffff;">
        <h1 style="margin:0;font-size:28px;letter-spacing:0.5px;">Maths Master</h1>
        <p style="margin:8px 0 0;font-size:15px;opacity:0.9;">
          Payment Confirmation
        </p>
      </div>

      <!-- BODY -->
      <div style="padding:36px;color:#111827;">
        <h2 style="margin-top:0;color:#16a34a;font-size:22px;">
          Payment Successful 🎉
        </h2>

        <p style="font-size:15px;line-height:1.7;color:#374151;">
          Hi <strong>${name}</strong>,
        </p>

        <p style="font-size:15px;line-height:1.7;color:#374151;">
          We’re happy to inform you that your payment has been successfully received.
          Your enrollment with <strong>Maths Master</strong> is now fully confirmed.
        </p>

        <!-- DETAILS CARD -->
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:20px;margin:28px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;">
            <tr>
              <td style="padding:10px 0;color:#6b7280;">Class</td>
              <td style="padding:10px 0;text-align:right;font-weight:600;color:#111827;">
                ${className}
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#6b7280;">Course</td>
              <td style="padding:10px 0;text-align:right;font-weight:600;color:#111827;">
                ${courseType}
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#6b7280;">Amount Paid</td>
              <td style="padding:10px 0;text-align:right;font-weight:700;color:#16a34a;">
                ${amount}
              </td>
            </tr>
          </table>
        </div>

        <!-- CTA -->
        <div style="text-align:center;margin:36px 0;">
          <a href="https://mathsmaster.co.in/login"
             style="
               background:#2563eb;
               color:#ffffff;
               text-decoration:none;
               padding:14px 34px;
               border-radius:8px;
               font-size:16px;
               font-weight:600;
               display:inline-block;
             ">
            Login to Your Account
          </a>
        </div>

        <p style="font-size:14px;line-height:1.7;color:#6b7280;">
          You can now access all your live classes, recorded sessions,
          notes, and practice materials from your dashboard.
        </p>

        <p style="margin-top:32px;font-size:14px;color:#111827;">
          Warm regards,<br/>
          <strong>Maths Master Team</strong>
        </p>
      </div>

      <!-- FOOTER -->
      <div style="background:#f9fafb;padding:18px;text-align:center;font-size:12px;color:#6b7280;">
        © ${new Date().getFullYear()} Maths Master. All rights reserved.
      </div>

    </div>
  </div>
  `,
});
export const classScheduledEmail = ({
  name,
  className,
  board,
  course,
  date,
  time,
  link,
}) => ({
  subject: "📘 Your Live Class is Scheduled – Maths Master",
  html: `
  <div style="font-family:Inter,Arial,sans-serif;background:#f3f4f6;padding:40px;">
    <div style="max-width:620px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.08);">

      <div style="background:linear-gradient(135deg,#2563eb,#1e40af);padding:26px;color:#fff;text-align:center;">
        <h1 style="margin:0;font-size:26px;">Maths Master</h1>
        <p style="margin:6px 0 0;opacity:0.9;">Live Class Scheduled</p>
      </div>

      <div style="padding:32px;color:#111827;">
        <h2 style="margin-top:0;">Hello ${name} 👋</h2>

        <p>Your live class has been successfully scheduled. Please find the details below:</p>

        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:18px;margin:24px 0;">
          <p><b>Class:</b> ${className}</p>
          <p><b>Board:</b> ${board}</p>
          <p><b>Course:</b> ${course}</p>
          <p><b>Date:</b> ${date}</p>
          <p><b>Time:</b> ${time}</p>
        </div>

        <div style="text-align:center;margin:30px 0;">
          <a href="${link}"
             style="background:#2563eb;color:#fff;padding:14px 30px;
                    border-radius:8px;text-decoration:none;font-weight:600;">
            Join Live Class
          </a>
        </div>

        <p>Please be on time to get the maximum benefit from the session.</p>

        <p style="margin-top:30px;">
          Regards,<br/>
          <strong>Maths Master Team</strong>
        </p>
      </div>

      <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#6b7280;">
        © ${new Date().getFullYear()} Maths Master
      </div>

    </div>
  </div>
  `,
});
export const classReminderEmail = ({
  name,
  className,
  board,
  course,
  date,
  time,
  link,
}) => ({
  subject: "⏰ Reminder: Your Live Class Starts in 30 Minutes",
  html: `
  <div style="font-family:Inter,Arial,sans-serif;background:#fef3c7;padding:40px;">
    <div style="max-width:620px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.1);">

      <div style="background:#f59e0b;padding:26px;color:#111827;text-align:center;">
        <h1 style="margin:0;font-size:26px;">⏰ Class Reminder</h1>
        <p style="margin:6px 0 0;">Starting Soon</p>
      </div>

      <div style="padding:32px;color:#111827;">
        <h2>Hello ${name},</h2>

        <p>Your live class will begin in <b>30 minutes</b>. Please be ready.</p>

        <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:18px;margin:24px 0;">
          <p><b>Class:</b> ${className}</p>
          <p><b>Board:</b> ${board}</p>
          <p><b>Course:</b> ${course}</p>
          <p><b>Date:</b> ${date}</p>
          <p><b>Time:</b> ${time}</p>
        </div>

        <div style="text-align:center;margin:30px 0;">
          <a href="${link}"
             style="background:#f59e0b;color:#111827;padding:14px 30px;
                    border-radius:8px;text-decoration:none;font-weight:700;">
            Join Class Now
          </a>
        </div>

        <p>Make sure your internet and device are ready.</p>

        <p style="margin-top:30px;">
          All the best! 🚀<br/>
          <strong>Maths Master Team</strong>
        </p>
      </div>

      <div style="background:#fffbeb;padding:16px;text-align:center;font-size:12px;color:#92400e;">
        © ${new Date().getFullYear()} Maths Master
      </div>

    </div>
  </div>
  `,
});