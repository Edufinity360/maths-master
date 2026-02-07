import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js"
import liveClassRoute from "./routes/liveClassRoute.js";



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

app.listen(PORT, () => {
  console.log(`🚀 Maths Master backend running on port ${PORT}`);
});