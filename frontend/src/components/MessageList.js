import React, { useState, useEffect } from "react";
import {
  initiateSocketConnection,
  disconnectSocket,
  subscribeToChat,
} from "../services/socketService";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Subscribe to chat messages from the server
    subscribeToChat((err, newMessage) => {
      if (err) return;
      // Append the new message to the current list of messages
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, []);

  return (
    <div className="message-list mb-3">
      {messages.map((msg, index) => (
        <div key={index} className="alert alert-secondary">
          {msg}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
