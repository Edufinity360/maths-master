import axios from "axios";

export const sendWhatsApp = async ({ to, message }) => {
  try {
    const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const response = await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ WhatsApp sent:", response.data.messages[0].id);
    return response.data;

  } catch (error) {
    console.error("❌ WhatsApp Error:", error.response?.data || error.message);
    throw error;
  }
};