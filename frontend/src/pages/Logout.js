import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    //home page after logout
    navigate("/home");
  };

  const handleCancel = () => {
    //previous page on cancel
    window.history.back();
  };

  return (
    <div className="text-center">
      <h2>Logout</h2>
      <p>Are you sure you want to logout?</p>
      <button className="btn btn-secondary mx-2" onClick={handleLogout}>
        Logout
      </button>
      <button className="btn btn-secondary mx-2" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}
