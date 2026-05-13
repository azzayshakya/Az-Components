const { readDB, writeDB } = require("../models/db");

const onlineUsers = {};

function getOnlineUsers() {
  return onlineUsers;
}

function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("🟢 Connected:", socket.id);

    socket.on("register", (userId) => {
      onlineUsers[userId] = socket.id;
      console.log("📌 Registered:", userId);
      io.emit("online_users", Object.keys(onlineUsers));
    });

    socket.on("send_message", ({ from, to, text }) => {
      const db = readDB();
      const msg = {
        id: Date.now().toString(),
        from,
        to,
        text,
        createdAt: new Date().toISOString(),
        isRead: false,
      };
      db.messages.push(msg);
      writeDB(db);

      io.to(socket.id).emit("new_message", msg);
      if (onlineUsers[to]) {
        io.to(onlineUsers[to]).emit("new_message", msg);
      }
    });

    socket.on("disconnect", () => {
      for (const [uid, sid] of Object.entries(onlineUsers)) {
        if (sid === socket.id) {
          delete onlineUsers[uid];
          break;
        }
      }
      console.log("🔴 Disconnected:", socket.id);
      io.emit("online_users", Object.keys(onlineUsers));
    });
  });
}

module.exports = { socketHandler, getOnlineUsers };
