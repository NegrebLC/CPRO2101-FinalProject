import React, { useState, useRef } from "react";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    onSendMessage(trimmedMessage);
    setMessage("");

    // Return focus to the input field for better user experience
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
          {" "}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
