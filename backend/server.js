import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import { initSocket } from "./socket/socket.js";   // ⬅️ IMPORTANT

import liveClassRoute from "./routes/liveClassRoute.js";  // ⬅️ API Route

dotenv.config();

// ---------------------
// 1️⃣ Create HTTP Server
// ---------------------
const httpServer = http.createServer(app);

// ---------------------
// 2️⃣ Initialize Socket.IO
// ---------------------
initSocket(httpServer);   // ⬅️ All socket logic moved to socket.js

// ---------------------
// 3️⃣ Register Routes
// ---------------------
app.use("/api/liveclass", liveClassRoute);

// ---------------------
// 4️⃣ MongoDB Connection
// ---------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🌿 MongoDB Atlas connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ---------------------
// 5️⃣ Start Server
// ---------------------
const PORT = process.env.PORT || 6002;
httpServer.listen(PORT, () =>
  console.log(`🚀 Server running with Socket.IO on port ${PORT}`)
);