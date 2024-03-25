import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
  }, []);

  const handleSendMessage = (content) => {
    socket.emit("chat message", { content, sender: "user" });
  };

  return (
    <div>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
