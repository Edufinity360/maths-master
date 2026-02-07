import axios from "axios";
import {
  welcomeWhatsApp,
  paymentPendingWhatsApp,
  paymentSuccessWhatsApp,
  classScheduledWhatsApp,
  classReminderWhatsApp
} from "../utils/whatsappTemplates.js";

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.WHATSAPP_PHONE_ID;

const sendWhatsApp = async ({ to, message }) => {
  if (!WHATSAPP_TOKEN || WHATSAPP_TOKEN === "coming_soon") {
    console.log("⚠️ WhatsApp API not active yet");
    console.log("Mock message:", message);
    return;
  }

  try {
    await axios.post(
      `https://graph.facebook.com/v19.0/${PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message }
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ WhatsApp sent:", to);
  } catch (err) {
    console.error("❌ WhatsApp error:", err.response?.data || err.message);
  }
};

/* -------- PUBLIC FUNCTIONS -------- */

export const sendWelcomeWhatsApp = (user) =>
  sendWhatsApp({
    to: user.phone,
    message: welcomeWhatsApp(user).message
  });

export const sendPaymentPendingWhatsApp = (data) =>
  sendWhatsApp({
    to: data.phone,
    message: paymentPendingWhatsApp(data).message
  });

export const sendPaymentSuccessWhatsApp = (data) =>
  sendWhatsApp({
    to: data.phone,
    message: paymentSuccessWhatsApp(data).message
  });

export const sendClassScheduledWhatsApp = (data) =>
  sendWhatsApp({
    to: data.phone,
    message: classScheduledWhatsApp(data).message
  });

export const sendClassReminderWhatsApp = (data) =>
  sendWhatsApp({
    to: data.phone,
    message: classReminderWhatsApp(data).message
  });