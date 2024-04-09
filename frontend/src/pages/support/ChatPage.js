import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import ChatList from "../../components/support/ChatList";
import MessageList from "../../components/support/MessageList";
import MessageInput from "../../components/support/MessageInput";
import supportApi from "../../services/supportApi";
import { useAuth } from "../../context/AuthContext";

const ChatPage = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchChats();
  }, [currentUser]);

  useEffect(() => {
    if (!currentChat || !currentChat._id) return;
    fetchMessages(currentChat);
  }, [currentChat]);

  useEffect(() => {
    if (currentChat && currentChat._id) {
      fetchMessages(currentChat);
      const messageInterval = setInterval(() => {
        fetchMessages(currentChat);
      }, 5000);
      return () => clearInterval(messageInterval);
    }
  }, [currentChat]);

  // Gets list of all chats for the user
  const fetchChats = async () => {
    try {
      let response;
      if (currentUser.role === "user") {
        response = await supportApi.getChatsByUsername(currentUser.username);
      } else if (currentUser.role === "agent") {
        response = await supportApi.getChatsActive();
      }
      setChats(response.data);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  };

  // Gets all messages in a chat
  const fetchMessages = async (chat) => {
    try {
      const response = await supportApi.getChatMessages(chat._id);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // Selects a chat
  const handleChatSelection = (chatId) => {
    const selectedChat = chats.find((chat) => chat._id === chatId);
    setCurrentChat(selectedChat);
  };

  // Sends a message
  const handleSendMessage = async (messageContent) => {
    if (!currentChat || currentChat.status === "closed") {
      alert("This chat is closed. Please open a new chat if you need help.");
      return;
    }
    try {
      const payload = {
        chatId: currentChat._id,
        sender: currentUser.id,
        onModel:
          currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1),
        content: messageContent,
      };
      await supportApi.sendMessage(payload);
      fetchMessages(currentChat);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Handles the initiation of a new chat
  const handleStartChat = async () => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await supportApi.startChat(
        {
          userId: currentUser.id,
          agentId: 1,
        },
        config
      );

      fetchChats();
    } catch (error) {
      console.error("Failed to start chat:", error);
    }
  };

  // Closes a chat
  const handleCloseChat = async () => {
    if (!currentChat) return;
    try {
      await supportApi.closeChat(currentChat._id);
      alert("Chat has been closed.");
      fetchChats();
    } catch (error) {
      console.error("Failed to close chat:", error);
    }
  };

  return (
    <Layout>
      <div className="chat-page container-fluid">
        {currentUser.role === "user" && (
          <div className="row mb-3">
            <div className="col-md-12 d-flex justify-content-between">
              <button className="btn btn-primary" onClick={handleStartChat}>
                Start Chat with Agent
              </button>
            </div>
          </div>
        )}
        <button className="btn btn-danger" onClick={handleCloseChat}>
          Close Chat
        </button>
        <div className="row">
          <div className="col-md-4">
            <ChatList
              chats={chats}
              onSelectChat={handleChatSelection}
              currentChatId={currentChat?._id}
            />
          </div>
          {currentChat && (
            <div
              className="col-md-8"
              style={{
                border: "1px solid #696969",
                borderRadius: "5px",
                padding: "10px",
                margin: "10px 0",
              }}
            >
              <MessageList messages={messages} currentUserId={currentUser.id} />
              <MessageInput
                onSendMessage={handleSendMessage}
                chatStatus={currentChat ? currentChat.status : "open"}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
