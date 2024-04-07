import React from "react";

const ChatList = ({ chats, onSelectChat }) => {
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

          return (
            <li
              key={chat._id}
              tabIndex={0}
              className={`list-group-item ${bgColorClass}`}
              onClick={() => onSelectChat(chat._id)}
              onKeyPress={(e) => handleKeyPress(e, chat._id)}
              style={{ color: "black" }}
            >
              {chat.title || `Chat ${chat._id}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatList;
