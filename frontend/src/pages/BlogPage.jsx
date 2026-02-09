import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BlogPage.css";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
     const { data } = await axios.get("/api/blogs");

console.log("API BLOG RESPONSE:", data);

setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
    } catch (err) {
      console.error("BLOG FETCH ERROR:", err);
      setBlogs([]);
    }
  };

  return (
    <div className="blog-wrapper">

      {/* HERO HEADER */}
      <div className="blog-hero">
        <div className="blog-overlay">
          <img src="/Mathmaster.png" alt="logo" className="blog-logo" />
          <h1>Math Master Blog</h1>
          <p>Tips • Concepts • Strategy • Exam Mastery</p>
        </div>
      </div>

      {/* BLOG CONTENT */}
      <div className="blog-container">
        <h2>Latest Blogs</h2>

        {blogs.length === 0 ? (
          <p>No blogs yet</p>
        ) : (
          blogs.map((b) => (
            <div key={b._id} className="blog-card">
              <h3>{b.title}</h3>
              <p>{b.content}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}