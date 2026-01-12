import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PaymentPage.css";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [base, setBase] = useState(0);

  // 🔹 Query params (ONLY for display)
  const query = new URLSearchParams(window.location.search);
  const email = query.get("email");
  const course = query.get("course");

  // ✅ SINGLE SOURCE OF PRICE (from Join page)
  useEffect(() => {
    const storedPrice = localStorage.getItem("mm-price");
    if (!storedPrice) {
      alert("Price missing. Please re-register.");
      return;
    }
    setBase(Number(storedPrice));
  }, []);

  const gst = Math.round(base * 0.18);
  const finalAmount = base + gst;

  const handlePayment = async () => {
    if (!email) return alert("Missing email");

    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/payment/create-order",
        { amount: finalAmount }
      );

      if (!data.success) {
        alert("Order creation failed");
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: finalAmount * 100,
        currency: "INR",
        name: "Maths Master",
        description: `${course} Course Payment`,
        order_id: data.order.id,

        handler: async function (response) {
          const verifyRes = await axios.post(
            "/api/payment/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              email,
            }
          );

          if (verifyRes.data.success) {
            window.location.href = verifyRes.data.redirect;
          } else {
            alert("Payment verification failed");
          }
        },

        prefill: { email },
        theme: { color: "#2563eb" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h2>💳 Payment Checkout</h2>

        <p><strong>Email:</strong> {email}</p>
        <p><strong>Course:</strong> {course}</p>

        <p className="payment-line">Base Fee: ₹{base}</p>
        <p className="payment-line">GST (18%): ₹{gst}</p>

        <h3 className="final-amount">
          Total Payable: ₹{finalAmount}
        </h3>

        <button onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}