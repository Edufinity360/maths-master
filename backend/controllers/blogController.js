import Blog from "../models/Blog.js";
import slugify from "slugify";

// create blog (admin)
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = new Blog({
  title,
  content,
  status: "published",
  slug: slugify(title, { lower: true })
});

    await blog.save();

    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all published blogs (public)
export const getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json({ success: true, blogs });
};

// single blog by slug
export const getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  res.json(blog);
};
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    await Blog.findByIdAndDelete(id);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};