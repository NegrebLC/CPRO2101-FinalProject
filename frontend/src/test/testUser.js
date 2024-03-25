const io = require("socket.io-client");
const httpPost = require("./httpPost");

// Connect to the Socket.IO server
const socket = io("http://localhost:5000", {
  query: {
    role: "user",
    username: "test",
  },
});

socket.on("connect", () => {
  console.log("TestUser connected");

  // Start a new chat session via API
  httpPost(
    "/api/chats/start",
    { userId: "1", agentId: "65ffea1e23f41f89b0233264" },
    (err, chat) => {
      if (err) {
        console.error("Error starting chat:", err);
        return;
      }
      console.log("Chat started:", chat);

      // Assume chat._id is available in the response and use it to send a message
      const chatId = chat._id;
      httpPost(
        `/api/chats/${chatId}/message`,
        {
          senderId: "1",
          content: "Hello, I need help with my account.",
          senderType: "User",
        },
        (err, message) => {
          if (err) {
            console.error("Error sending message:", err);
            return;
          }
          console.log("Message sent:", message);
        }
      );
    }
  );
});

// Listen for messages from the server (real-time updates)
socket.on("chat message", (msg) => {
  console.log("Message received from TestAgent:", msg);
});
