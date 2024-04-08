import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// Custom hook for easy access to the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = async ({ username, password, role }) => {
    let url = "";
    if (role === "user") {
      url = "http://localhost:5000/api/users/login";
    } else if (role === "agent") {
      url = "http://localhost:5000/api/agents/login";
    }

    try {
      const { data } = await axios.post(url, { username, password });
      const user = { id: data.id, username: data.username, role, ...data };
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
    } catch (error) {
      console.error(`${role} login failed:`, error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
