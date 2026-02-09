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
    planType: "",
    price: 0,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ JEE / NEET special handling
    if (name === "class" && (value === "JEE" || value === "NEET")) {
      setForm({
        ...form,
        class: value,
        board: "",
        course: "Crash",
        planType: "onetime",
        price: 24999,
      });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const calculateNextDueDate = () => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return d.toISOString().split("T")[0];
  };

  const calculatePrice = (course, planType, cls, board) => {
    let price = 0;

    // 🔥 JEE / NEET FIXED
    if (cls === "JEE" || cls === "NEET") {
      return 24999;
    }

    if (cls === "MHTCET") {
      if (course === "Crash") price = 4999;
      else if (course === "Regular" && planType === "yearly") price = 14999;
      else if (course === "Regular" && planType === "monthly") price = 1499;
    } else {
      if (course === "Crash") price = 1999;
      else if (course === "Regular" && board === "CBSE") {
        price = planType === "monthly" ? 1999 : 12999;
      } else if (course === "Regular" && board === "Maharashtra") {
        price = planType === "monthly" ? 1499 : 9999;
      }
    }

    return price;
  };

  const handleCourse = (e) => {
    const course = e.target.value;

    // 🚫 Block course change for JEE / NEET
    if (form.class === "JEE" || form.class === "NEET") return;

    let price = 0;
    let planType = "";

    if (course === "Crash") {
      price = calculatePrice("Crash", "", form.class, form.board);
    }

    setForm({ ...form, course, price, planType });
  };

  const handlePlanType = (e) => {
    const planType = e.target.value;

    // 🚫 No plan type for JEE / NEET
    if (form.class === "JEE" || form.class === "NEET") return;

    const price = calculatePrice(form.course, planType, form.class, form.board);
    setForm({ ...form, planType, price });
  };

  const submitHandler = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.class ||
      !form.course ||
      (form.course === "Regular" && !form.planType) ||
      !form.password
    ) {
      alert("Please fill all required fields");
      return;
    }

    const finalPhone = `${form.phoneCode}${form.phone}`;
    const nextDueDate =
      form.planType === "monthly" ? calculateNextDueDate() : null;

    try {
      const res = await fetch("/api/student/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: finalPhone,
          city: form.city,
          class: form.class,
          board: form.board,
          courseType: form.course,
          planType: form.planType || "onetime",
          amount: form.price,
          nextDueDate,
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
      localStorage.setItem("planType", form.planType || "onetime");

      if (nextDueDate) {
        localStorage.setItem("nextDueDate", nextDueDate);
      }

      window.location.href = `/payment?email=${form.email}&course=${form.course}&class=${form.class}&plan=${form.planType || "onetime"}`;

    } catch {
      alert("Server error");
    }
  };

  return (
    <>
      <header className="mm-header">📘 Maths Master</header>

      <div className="join-container">
        <div className="join-left">
          <img
            src="https://img.freepik.com/free-vector/online-learning-concept_52683-37480.jpg"
            alt="Maths Master"
          />
          <h2>Learn Maths Smarter</h2>
          <p>Live + Recorded Classes by Experts</p>
        </div>

        <div className="join-right">
          <h2>🎓 Join Maths Master</h2>

          <input name="name" placeholder="Full Name *" value={form.name} onChange={handleChange} />
          <input name="email" placeholder="Email *" value={form.email} onChange={handleChange} />

          <div className="phone-group">
            <select name="phoneCode" value={form.phoneCode} onChange={handleChange}>
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
            <option value="JEE">JEE (8 Months)</option>
            <option value="NEET">NEET (8 Months)</option>
          </select>

          {form.class !== "MHTCET" &&
            form.class !== "JEE" &&
            form.class !== "NEET" && (
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

          {form.course === "Regular" &&
            form.class !== "JEE" &&
            form.class !== "NEET" && (
              <select name="planType" value={form.planType} onChange={handlePlanType}>
                <option value="">Select Plan *</option>
                <option value="monthly">Monthly Plan</option>
                <option value="yearly">Yearly Plan</option>
              </select>
            )}

          <input
            type="password"
            name="password"
            placeholder="Create Password *"
            value={form.password}
            onChange={handleChange}
          />

          {form.price > 0 && (
            <div className="price-box">
              {form.planType === "monthly" ? (
                <>
                  Monthly Fees: ₹{form.price}<br />
                  Next Due Date: {calculateNextDueDate()}
                </>
              ) : (
                <>Amount: ₹{form.price}</>
              )}
            </div>
          )}

          <button onClick={submitHandler}>Continue to Payment 💳</button>
        </div>
      </div>
    </>
  );
}