import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import AIAssistant from "../components/AIAssistant";

export default function HomePage() {
  return (
    <div className="homepage">

      {/* HEADER */}
      <header className="header">
        <div className="logo-box">
          <img src="/Mathmaster.png" alt="Maths Master" className="logo-img" />
          <span className="logo-text">Math Master</span>
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="login-link">
            <button>Login 🔐</button>
          </Link>
        </div>
      </header>

      {/* ANNOUNCEMENT */}
      <div className="announcement-bar">
        <span>🎯 <b>MHT-CET Live Class – Coming Soon</b></span>

        <span>
          💥 Enrollments{" "}
          <b className="price-cross">
            ₹9,999
            <span className="red-cross">✖</span>
          </b>{" "}
          → Just ₹4,999
        </span>

        <span className="blink">⏰ Limited Seats</span>

        <button
          className="announce-btn"
          onClick={() => (window.location.href = "/join")}
        >
          Enroll Now
        </button>
      </div>

      {/* GLOBAL BAR */}
      <div className="global-eco-horizontal">
        <div className="eco-center">
          <span className="eco-title blink">
            🌍 Global Education Ecosystem
          </span>

          <span className="eco-text">
            Franchise – Start Your Education Business | Teachers – Teach Globally, Earn Smart |
            Students – Learn with Discipline & Skills | Live in 20+ Countries (India, USA, UK, UAE)
          </span>

          <span className="eco-launch blink">
            🚀 Launching Soon
          </span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-text">
          <h2>Master Class 12 Maths – CBSE & Maharashtra Board</h2>
          <p>
            Structured lectures • Topicwise notes • Crash courses •
            Live interactive sessions with expert teachers.
          </p>

          <Link to="/join">
            <button className="started-btn">
              Start Learning Today 🚀
            </button>
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
          alt="banner"
          className="hero-img"
        />
      </section>

      {/* PRICING */}
      <section className="pricing-section">
        <h2 className="pricing-title">Choose Your Learning Plan</h2>

        <div className="pricing-row">

          <div className="price-card">
            <h3>⚡ Crash Course (CBSE + State)</h3>
            <p>60 Days Fast Track + Live Doubt Solving</p>
            <h4>₹ 2999</h4>
            <Link to="/join"><button>Enroll Now</button></Link>
          </div>

          <div className="price-card highlight">
            <h3>📘 CBSE Regular Course</h3>
            <p>Complete syllabus + Weekly Tests + Recorded Backup</p>
            <h4>₹ 1999 / Month</h4>
            <Link to="/join">
              <button className="popular-btn">Most Popular ⭐</button>
            </Link>
          </div>

          <div className="price-card">
            <h3>📗 Maharashtra Board Course</h3>
            <p>Maths I & II + Assignments + Concept Booster Notes</p>
            <h4>₹ 1499 / Month</h4>
            <Link to="/join"><button>Start Now</button></Link>
          </div>

        </div>
      </section>

      {/* WHY */}
      <section className="why-section">
        <h2>Why Students Love Maths Master ❤️</h2>
        <ul>
          <li>⏳ Smart Revision & Time Saving Techniques</li>
          <li>🎯 Concept Clarity with Real IIT Style Teaching</li>
          <li>📚 24×7 Doubt Support + Recorded Backup</li>
          <li>🏆 Score Booster Test Series</li>
        </ul>
      </section>

      <AIAssistant />

    </div>
  );
}