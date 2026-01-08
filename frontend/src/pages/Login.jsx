import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (!email || !password) return alert("Enter Email and Password");

    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:6002/api/student/login", {
        email,
        password,
      });

      // ➤ Paid student
if (data.success === true) {
  localStorage.setItem("student-token", data.token);
  localStorage.setItem("student-email", email);
  window.location.href = "/student-portal";
  return;
}

// ➤ Unpaid student
if (data.paymentRequired === true) {
  window.location.href = `/payment?email=${data.email}&course=${data.course}&board=${data.board}`;
  return;
}

// ➤ Wrong credentials / other error
alert(data.message);
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="login-container">

    {/* 🔹 Logo + Text Top-Left */}
    <div className="login-top-left">
      <img src="/logo512.png" alt="Maths Master" className="login-logo" />
      <span className="login-title">MATHS MASTER</span>
    </div>

    <div className="login-box">
      <h2>🔒 Student Login</h2>

      <input
        type="email"
        placeholder="Email *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password *"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submitHandler} disabled={loading}>
        {loading ? "Checking..." : "Login"}
      </button>

      <p className="register-text">
        Not registered yet?{" "}
        <span onClick={() => (window.location.href = "/join")}>
          Create Account
        </span>
      </p>
    </div>
  </div>
);
}