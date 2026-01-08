import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin"
import Join from "./pages/Join"; 
import Login from "./pages/Login";
import StudentPortal from "./pages/StudentPortal";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/join" element={<Join />} />    {/* 🔥 Route added */}
        <Route path="/login" element={<Login />} />
        <Route path="/student-portal" element={<StudentPortal />} />
        <Route path="/admin-login" element={<AdminLogin />} />

      </Routes>
         {/* 👇 YE LINE ADD KAR */}
      <Footer />
    </Router>
  );
}

export default App;