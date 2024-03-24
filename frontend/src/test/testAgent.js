const io = require("socket.io-client");
const httpPost = require("./httpPost"); // Make sure this path is correct based on your project structure

// Variables to hold chat session state
let currentChatId = "65ffef30cbd66f31266d40e7";

// Connect to the Socket.IO server
const socket = io("http://localhost:5000", {
  query: {
    role: "agent",
    username: "testagent",
  },
});

socket.on("connect", () => {
  console.log("TestAgent connected");
});

socket.on("chat message", (msg) => {
  console.log("Message received from TestUser:", msg);

  if (currentChatId) {
    httpPost(
      `/api/chats/${currentChatId}/message`,
      {
        senderId: "65ffea1e23f41f89b0233264",
        content: "I can help you with that. Could you provide your account ID?",
        senderType: "Agent",
      },
      (err, reply) => {
        if (err) {
          console.error("Error replying to message:", err);
          return;
        }
        console.log("Reply sent:", reply);
      }
    );
  }
});

// Example of setting the currentChatId (in a real scenario, this might come from an API call or real-time event)
currentChatId = "someChatId"; // This should be set dynamically based on actual chat sessions
