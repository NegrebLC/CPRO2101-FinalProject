require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Creates HTTP server and configures Socket.io
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust this to match frontend's URL for security
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle chat message
  socket.on("chat message", (msg) => {
    // Broadcast the message to all users
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Define routes

const PORT = process.env.PORT || 5000;

// Use the HTTP server to listen, not the Express app directly
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
