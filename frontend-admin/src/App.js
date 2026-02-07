import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;