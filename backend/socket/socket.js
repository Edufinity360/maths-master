import { Server } from "socket.io";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Store rooms and user info
  let rooms = {};   

  io.on("connection", (socket) => {
    console.log("🔵 User Connected:", socket.id);

    // -------------------------
    // 1️⃣ USER JOINS ROOM
    // -------------------------
    socket.on("join-room", ({ roomId, userId, role }) => {
      socket.join(roomId);

      // Store user in room
      if (!rooms[roomId]) rooms[roomId] = {};
      rooms[roomId][socket.id] = { userId, role };

      console.log(`👤 ${userId} (${role}) joined room ${roomId}`);

      io.to(roomId).emit("user-joined", { userId, socketId: socket.id });
    });

    // -------------------------
    // 2️⃣ USER LEAVES
    // -------------------------
    socket.on("leave-room", ({ roomId, userId }) => {
      socket.leave(roomId);
      io.to(roomId).emit("user-left", userId);

      if (rooms[roomId]) {
        delete rooms[roomId][socket.id];
      }
    });

    // -------------------------
    // 3️⃣ WEBRTC: VIDEO CALL SIGNALING
    // -------------------------
    socket.on("offer", ({ roomId, offer }) => {
      socket.to(roomId).emit("offer", { offer, from: socket.id });
    });

    socket.on("answer", ({ roomId, answer }) => {
      socket.to(roomId).emit("answer", { answer, from: socket.id });
    });

    socket.on("candidate", ({ roomId, candidate }) => {
      socket.to(roomId).emit("candidate", { candidate, from: socket.id });
    });

    // -------------------------
    // 4️⃣ WHITEBOARD SYNC
    // -------------------------
    socket.on("whiteboard-draw", ({ roomId, data }) => {
      socket.to(roomId).emit("whiteboard-draw", data);
    });

    socket.on("whiteboard-clear", (roomId) => {
      io.to(roomId).emit("whiteboard-clear");
    });

    // -------------------------
    // 5️⃣ SCREEN SHARE
    // -------------------------
    socket.on("screen-share-start", (roomId) => {
      socket.to(roomId).emit("screen-share-start", socket.id);
    });

    socket.on("screen-share-stop", (roomId) => {
      socket.to(roomId).emit("screen-share-stop");
    });

    // -------------------------
    // 6️⃣ RAISE HAND
    // -------------------------
    socket.on("raise-hand", ({ roomId, userId }) => {
      io.to(roomId).emit("raise-hand", { userId });
    });

    // -------------------------
    // 7️⃣ TEACHER CONTROLS
    // -------------------------
    socket.on("mute-all", (roomId) => {
      io.to(roomId).emit("mute-all");
    });

    socket.on("kick-user", ({ roomId, userSocketId }) => {
      io.to(roomId).emit("kick-user", userSocketId);
    });

    // -------------------------
    // 8️⃣ ATTENDANCE TRACKING
    // -------------------------
    socket.on("mark-attendance", ({ roomId, userId }) => {
      io.to(roomId).emit("attendance-marked", { userId });
    });

    // -------------------------
    // 9️⃣ CHAT SYSTEM
    // -------------------------
    socket.on("chatMessage", ({ roomId, userId, message }) => {
      io.to(roomId).emit("chatMessage", {
        userId,
        message,
        time: new Date()
      });
    });

    // -------------------------
    // 🔟 DISCONNECT HANDLER
    // -------------------------
    socket.on("disconnect", () => {
      console.log("🔴 User Disconnected:", socket.id);

      for (let roomId in rooms) {
        if (rooms[roomId][socket.id]) {
          let user = rooms[roomId][socket.id];
          io.to(roomId).emit("user-left", user.userId);

          delete rooms[roomId][socket.id];
        }
      }
    });
  });
};