import React from "react";

const ChatList = ({ chats, onSelectChat, selectedChatId }) => {
  // Handling key press to improve accessibility
  const handleKeyPress = (event, chatId) => {
    if (event.key === "Enter" || event.key === " ") {
      onSelectChat(chatId);
    }
  };

  return (
    <div className="chat-list" aria-label="Chat list">
      <ul className="list-group">
        {chats.map((chat) => (
          <li
            key={chat._id}
            tabIndex={0} // Make list items focusable
            className={`list-group-item ${
              selectedChatId === chat._id ? "active" : ""
            }`}
            onClick={() => onSelectChat(chat._id)}
            onKeyPress={(e) => handleKeyPress(e, chat._id)}
            aria-selected={selectedChatId === chat._id ? "true" : "false"}
          >
            {chat.title || `Chat ${chat._id}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
