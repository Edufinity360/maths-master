import React, { useState } from "react";
import "./AdminLogin.css";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "/api/admin-auth/login",
        { email, password }
      );

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        window.location.href = "/admin";
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="admin-login-wrapper">
      {/* HEADER */}
      <header className="admin-header">
        Maths Master – Admin Panel
      </header>

      {/* BODY */}
      <div className="admin-login-container">
        {/* LEFT */}
        <div className="admin-login-left">
          <img
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df"
            alt="education"
          />
        </div>

        {/* RIGHT */}
        <div className="admin-login-right">
          <h2>Admin Login</h2>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;