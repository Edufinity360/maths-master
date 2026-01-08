import SibApiV3Sdk from "sib-api-v3-sdk";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const client = SibApiV3Sdk.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const email = {
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: process.env.BREVO_SENDER_NAME,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    };

    await apiInstance.sendTransacEmail(email);
    return true;
  } catch (err) {
    console.error("BREVO ERROR 👉", err.response?.body || err.message);
    return false;
  }
};