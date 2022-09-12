const cors = require("cors");
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
    },
  });

// Socket Events
const NEW_CHAT_MESSAGE_EVENT = "chat";

io.on("connection", (socket) => {
  console.log("Connected");

  const {roomId} = socket.handshake.query;
  socket.join(roomId);

  console.log("New client connected: ", socket.id, " in ", roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.broadcast(NEW_CHAT_MESSAGE_EVENT, data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
});

const server = httpServer.listen(5000, () => {
    console.log("Socket Server runs at " + 5000);
});
  