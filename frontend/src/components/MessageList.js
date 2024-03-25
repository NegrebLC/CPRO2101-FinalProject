import React from "react";

const MessageList = ({ messages }) => {
  return (
    <ul>
      {messages.map((msg, index) => (
        <li key={index}>{msg.content}</li> // Adjust based on your message structure
      ))}
    </ul>
  );
};

export default MessageList;
