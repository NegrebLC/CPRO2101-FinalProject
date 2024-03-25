import React from "react";

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
                className={`badge ${
                  message.sender === currentUserId ? "bg-info" : "bg-warning"
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
