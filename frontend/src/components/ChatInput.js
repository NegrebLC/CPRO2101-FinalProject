import React, { useState } from "react";
import { sendMessage } from "../services/socketService";

const ChatInput = () => {
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault(); // Prevent the form from causing a page reload
    if (!message.trim()) return; // Ignore empty messages
    sendMessage(message); // Send the message through the socket
    setMessage(""); // Clear the input field
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <button className="btn btn-outline-secondary" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
