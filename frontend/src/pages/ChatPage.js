import Layout from "../components/Layout";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import React, { useState, useEffect } from "react";
import {
  initiateSocketConnection,
  disconnectSocket,
  subscribeToChat,
} from "../services/socketService";

const ChatPage = () => {
  useEffect(() => {
    // Establish the socket connection when the component mounts
    initiateSocketConnection();

    // Clean up function to disconnect the socket when the component unmounts
    return () => disconnectSocket();
  }, []);
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          {/* Chat section */}
          <div className="col-md-8">
            <MessageList />
            <ChatInput />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
