import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogBySlug
} from "../controllers/blogController.js";
import { deleteBlog } from "../controllers/blogController.js";
const router = express.Router();

router.post("/admin/create", createBlog);   // admin only
router.get("/", getBlogs);                  // public
router.get("/:slug", getBlogBySlug);        // public
router.delete("/:id", deleteBlog);
export default router;