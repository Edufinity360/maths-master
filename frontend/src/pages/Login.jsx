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
      const { data } = await axios.post("/api/student/login", {
        email,
        password,
      });

      if (data.success === true) {
        localStorage.setItem("student-token", data.token);
        localStorage.setItem("student-email", email);
        window.location.href = "/student-portal";
        return;
      }

      if (data.paymentRequired === true) {
        window.location.href = `/payment?email=${data.email}&course=${data.course}&board=${data.board}`;
        return;
      }

      alert(data.message);
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* Logo Top Left */}
      <div className="login-top-left">
        <img src="/Mathmaster.png" alt="Maths Master" className="login-logo" />
        <span className="login-title">MATH MASTER</span>
      </div>

      <div className="login-wrapper">

        {/* LEFT IMAGE */}
        <div className="login-image">
          <img
            src="https://img.freepik.com/free-vector/online-learning-concept_52683-37480.jpg"
            alt="Learning"
          />
          <h2>Learn Smarter. Score Higher.</h2>
          <p>Live + Recorded Classes by Expert Teachers</p>
        </div>

        {/* DIVIDER */}
        <div className="login-divider"></div>

        {/* RIGHT FORM */}
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
    </div>
  );
}