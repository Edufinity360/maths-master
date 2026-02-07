import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Question required",
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful maths teacher. Explain clearly and step-by-step.",
        },
        { role: "user", content: question },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    const answer =
      response?.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate an answer.";

    res.json({
      success: true,
      answer,
    });
  } catch (err) {
    console.error("AI ERROR:", err);

    res.status(500).json({
      success: false,
      message: "AI failed",
    });
  }
};