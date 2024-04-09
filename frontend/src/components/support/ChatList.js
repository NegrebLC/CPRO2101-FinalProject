import React from "react";

const ChatList = ({ chats, onSelectChat, currentChatId }) => {
  const handleKeyPress = (event, chatId) => {
    if (event.key === "Enter" || event.key === " ") {
      onSelectChat(chatId);
    }
  };

  return (
    <div className="chat-list" aria-label="Chat list">
      <ul className="list-group">
        {chats.map((chat) => {
          const bgColorClass =
            chat.status === "closed" ? "bg-warning" : "bg-info";
          const isSelected = chat._id === currentChatId;
          const selectedClass = isSelected ? "selected-chat" : "";

          return (
            <li
              key={chat._id}
              tabIndex={0}
              className={`list-group-item ${bgColorClass} ${selectedClass}`}
              onClick={() => onSelectChat(chat._id)}
              onKeyPress={(e) => handleKeyPress(e, chat._id)}
              style={{
                color: isSelected ? "white" : "black",
                cursor: "pointer",
              }}
            >
              {chat.title || `Chat ${chat._id.substring(chat._id.length - 5)}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatList;
