import React, { useState } from "react";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("http://localhost:6002/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer || "No response");
    } catch (err) {
      setAnswer("AI failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "14px 18px",
          borderRadius: "50px",
          border: "none",
          background: "#1e40af",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
          zIndex: 9999,
        }}
      >
        🤖 Ask AI
      </button>

      {/* Popup */}
      {open && (
        <div
         style={{
  position: "fixed",
  bottom: "80px",
  right: "20px",
  width: "320px",
  maxHeight: "70vh",   // ✅ popup screen se bahar nahi jayega
  overflowY: "auto",   // ✅ andar scroll hoga
  background: "#111",
  borderRadius: "10px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  padding: "15px",
  zIndex: 9999,
  color: "#fff"
}}
        >
          <h4>Mathmaster AI Assistant</h4>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask maths question..."
            style={{ width: "100%", height: "70px" }}
          />

          <button
            onClick={askAI}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "8px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>

          {answer && (
            <div
              style={{
                marginTop: "10px",
                background: "#203804",
                padding: "8px",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            >
              {answer}
            </div>
          )}
        </div>
      )}
    </>
  );
}