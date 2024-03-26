import React from "react";
import "./MessageList.css"; // Make sure this import points to your CSS file

const MessageList = ({ messages, currentUserId }) => {
  return (
    <div className="message-list">
      {messages.length > 0 ? (
        <ul className="list-unstyled">
          {messages.map((message) => (
            <li
              key={message.id}
              className={`message d-flex ${
                message.sender === currentUserId
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <span
                className={`badge message-text ${
                  message.sender === currentUserId ? "bg-primary" : "bg-warning"
                } text-dark`}
              >
                {message.content}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages in this chat</p>
      )}
    </div>
  );
};

export default MessageList;
