import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const supportApi = {
  // Agent-related API calls
  createAgent: (agentData) =>
    axios.post(`${API_BASE_URL}/agents/create`, agentData),
  getAllAgents: () => axios.get(`${API_BASE_URL}/agents/find/all`),
  getAgentById: (agentId) =>
    axios.get(`${API_BASE_URL}/agents/find/${agentId}`),
  deleteAgent: (agentId) =>
    axios.delete(`${API_BASE_URL}/agents/delete/${agentId}`),
  agentLogin: (credentials) =>
    axios.post(`${API_BASE_URL}/agents/login`, credentials),
  getRestrictedAgent: (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return axios.get(`${API_BASE_URL}/agents/restricted`, config);
  },

  // Chat-related API calls
  startChat: (chatData) =>
    axios.post(`${API_BASE_URL}/support/chats/start`, chatData),
  closeChat: (chatId) =>
    axios.post(`${API_BASE_URL}/support/chats/${chatId}/close`),
  getChatMessages: (chatId) =>
    axios.get(`${API_BASE_URL}/support/chats/${chatId}/messages`),
  getChatsByUsername: (username) =>
    axios.get(`${API_BASE_URL}/support/chats/user/${username}`),
  getChatsActive: () => axios.get(`${API_BASE_URL}/support/chats/active`),

  // Message-related API calls
  sendMessage: (messageData) =>
    axios.post(`${API_BASE_URL}/support/messages/send`, messageData),
  getMessageHistory: (chatId) =>
    axios.get(`${API_BASE_URL}/support/messages/${chatId}/history`),
};

export default supportApi;
