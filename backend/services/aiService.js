import { openai } from "../utils/aiClient.js";

export const askAI = async (message) => {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are MathsMaster support AI assistant." },
      { role: "user", content: message }
    ]
  });

  return res.choices[0].message.content;
};