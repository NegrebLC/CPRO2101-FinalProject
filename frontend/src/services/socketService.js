import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
let socket;

export const initiateSocketConnection = () => {
  socket = io(ENDPOINT);
  console.log(`Connecting socket...`);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const subscribeToChat = (cb) => {
  if (!socket) return true;
  socket.on("chat message", (msg) => {
    console.log("Websocket event received!");
    return cb(null, msg);
  });
};

export const sendMessage = (message) => {
  if (socket) socket.emit("chat message", message);
};
