import React, { useState, useRef } from "react";

const MessageInput = ({ onSendMessage, chatStatus }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the chat is closed before sending the message
    if (chatStatus === "closed") {
      alert("This chat is closed! Please open a new chat if you need help.");
      return; // Prevent sending the message
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    onSendMessage(trimmedMessage);
    setMessage("");

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message..."
          aria-label="Message input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          ref={inputRef}
        />
        <button
          className="btn btn-primary"
          type="submit"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
