import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import ChatList from "../../components/support/ChatList";
import MessageList from "../../components/support/MessageList";
import MessageInput from "../../components/support/MessageInput";
import supportApi from "../../services/supportApi";
import { useAuth } from "../../context/AuthContext";

const ChatPage = () => {
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const { currentUser } = useAuth();

  // Function to fetch chats based on the current user's role
  const fetchChats = async () => {
    try {
      let response;
      console.log(currentUser);
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

  // Fetch the list of chats when the component mounts or the current user changes
  useEffect(() => {
    fetchChats();
  }, [currentUser]);

  // Fetch messages for the current chat
  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentChatId) return;
      try {
        const response = await supportApi.getChatMessages(currentChatId);
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [currentChatId]);

  // Handles chat selection, updating the current chat ID
  const handleChatSelection = (chatId) => {
    setCurrentChatId(chatId);
  };

  const handleSendMessage = async (messageContent) => {
    try {
      const senderId = currentUser.id;
      // Capitalize the first letter of currentUser.role
      const senderRole =
        currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);

      const payload = {
        chatId: currentChatId,
        sender: senderId,
        onModel: senderRole,
        content: messageContent,
      };
      console.log("Sending message with payload:", payload);

      await supportApi.sendMessage(payload);

      const response = await supportApi.getChatMessages(currentChatId);
      setMessages(response.data);
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

  return (
    <Layout>
      <div className="chat-page container-fluid">
        {currentUser.role === "user" && (
          <div className="row mb-3">
            <div className="col-md-12">
              <button className="btn btn-primary" onClick={handleStartChat}>
                Start Chat with Agent
              </button>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-4">
            <ChatList chats={chats} onSelectChat={handleChatSelection} />
          </div>
          <div className="col-md-8">
            <MessageList messages={messages} currentUserId={currentUser.id} />
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
