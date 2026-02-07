import React from "react";
import "./PaymentSuccess.css";

export default function PaymentSuccess() {
  return (
    <div className="success-container">
      <div className="success-box">
        <div className="checkmark">✔</div>
        <h2>Payment Successful!</h2>
        <p>🎉 Thank you for joining <strong>Maths Master</strong>.</p>
        <p>Your course access has been unlocked.</p>
        <button onClick={() => (window.location.href = "/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
}