import React, { useState } from "react";
import "./Join.css";

export default function Join() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneCode: "+91",
    phone: "",
    city: "",
    class: "",
    board: "",
    course: "",
    price: 0,
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCourse = (e) => {
    const course = e.target.value;
    let price = 0;

    if (form.class === "MHTCET") {
      price = course === "Crash" ? 10 : 14999;
    } else {
      if (course === "Crash") price = 10;
      else if (course === "Regular" && form.board === "CBSE") price = 10;
      else if (course === "Regular" && form.board === "Maharashtra") price = 10;
    }

    setForm({ ...form, course, price });
  };

  const submitHandler = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.class ||
      !form.course ||
      !form.password
    ) {
      alert("Please fill all required fields");
      return;
    }

    const finalPhone = `${form.phoneCode}${form.phone}`;

    try {
      const res = await fetch("http://72.62.198.205:6002/api/student/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: finalPhone, // ✅ country code ke saath
          city: form.city,
          class: form.class,
          board: form.board,
          courseType: form.course,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        alert(data.message || "Registration failed");
        return;
      }

      localStorage.setItem("student-registration", JSON.stringify(form));
      localStorage.setItem("mm-price", form.price);
      localStorage.setItem("student-email", form.email);

      window.location.href = `/payment?email=${form.email}&course=${form.course}&class=${form.class}`;
    } catch {
      alert("Server error");
    }
  };

  return (
    <>
      {/* 🔷 Global Header */}
      <header className="mm-header">📘 Maths Master</header>

      <div className="join-container">
        {/* 🔹 LEFT */}
        <div className="join-left">
          <img
            src="https://img.freepik.com/free-vector/online-learning-concept_52683-37480.jpg"
            alt="Maths Master"
          />
          <h2>Learn Maths Smarter</h2>
          <p>Live + Recorded Classes by Experts</p>
        </div>

        {/* 🔹 RIGHT FORM */}
        <div className="join-right">
           
          <h2>🎓 Join Maths Master</h2>

          <input name="name" placeholder="Full Name *" value={form.name} onChange={handleChange} />
          <input name="email" placeholder="Email *" value={form.email} onChange={handleChange} />

          {/* 📱 Phone with country code */}
          <div className="phone-group">
  <select
    name="phoneCode"
    value={form.phoneCode || "+91"}
    onChange={handleChange}
  >
    <option value="+91">IN +91</option>
    <option value="+1">US +1</option>
    <option value="+44">UK +44</option>
  </select>

  <input
    name="phone"
    placeholder="Phone Number *"
    value={form.phone}
    onChange={handleChange}
  />
</div>

          <input name="city" placeholder="City *" value={form.city} onChange={handleChange} />

          <select name="class" value={form.class} onChange={handleChange}>
            <option value="">Select Class *</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
            <option value="MHTCET">MHTCET</option>
          </select>

          {form.class !== "MHTCET" && (
            <select name="board" value={form.board} onChange={handleChange}>
              <option value="">Select Board *</option>
              <option value="CBSE">CBSE</option>
              <option value="Maharashtra">Maharashtra State</option>
            </select>
          )}

          <select name="course" value={form.course} onChange={handleCourse}>
            <option value="">Select Course *</option>
            <option value="Crash">Crash Course</option>
            <option value="Regular">Regular Course</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Create Password *"
            value={form.password}
            onChange={handleChange}
          />

          {form.price > 0 && <div className="price-box">Amount: ₹{form.price}</div>}

          <button onClick={submitHandler}>Continue to Payment 💳</button>
        </div>
      </div>
    </>
  );
}