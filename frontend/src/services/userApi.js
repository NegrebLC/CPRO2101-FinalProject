import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const userApi = {
  createUser: (userData) =>
    axios.post(`${API_BASE_URL}/users/create`, userData),
  getAllUsers: () => axios.get(`${API_BASE_URL}/users/find/all`),
  getUserById: (userId) => axios.get(`${API_BASE_URL}/users/find/${userId}`),
  deleteUser: (userId) =>
    axios.delete(`${API_BASE_URL}/users/delete/${userId}`),
  userLogin: (credentials) =>
    axios.post(`${API_BASE_URL}/users/login`, credentials),
  getRestrictedContent: (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return axios.get(`${API_BASE_URL}/users/restricted`, config);
  },
};

export default userApi;
