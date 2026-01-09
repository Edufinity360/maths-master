import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import liveClassRoute from "./routes/liveClassRoute.js";

dotenv.config();

// ---------------------
// Register Routes
// ---------------------
app.use("/api/liveclass", liveClassRoute);

// ---------------------
// MongoDB Connection
// ---------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🌿 MongoDB Atlas connected successfully!"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

// ---------------------
// Start Server
// ---------------------
const PORT = process.env.PORT || 6002;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Maths Master backend running on port ${PORT}`);
});