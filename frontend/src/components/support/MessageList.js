import React from "react";
import "./MessageList.css";

const MessageList = ({ messages, currentUserId }) => {
  return (
    <div className="message-list">
      {messages.length > 0 ? (
        <ul className="list-unstyled">
          {messages.map((message) => (
            <li
              key={message.id}
              className={`d-flex ${
                message.sender === currentUserId
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`message-text ${
                  message.sender === currentUserId ? "bg-primary" : "bg-warning"
                } text-black`}
              >
                {message.content}
              </div>
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
