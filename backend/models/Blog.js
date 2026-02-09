import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true }, // for URL
    content: { type: String, required: true },
    author: { type: String, default: "Maths Master" },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft"
    },
    coverImage: String,
    tags: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);