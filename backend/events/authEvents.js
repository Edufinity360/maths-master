// backend/events/authEvents.js

import { sendEmail } from "../utils/sendEmail.js";
import { loginTemplate } from "../utils/emailTemplates.js";

export const loginSuccessEvent = async (user) => {
  await sendEmail({
    to: user.email,
    subject: "Login Successful | Maths Master",
    html: loginTemplate({
      name: user.name
    })
  });
};