import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate, Route } from "react-router-dom";

// Define a PrivateRoute component
const PrivateRoute = ({ element: Element, roles, ...rest }) => {
  const { currentUser } = useAuth();

  // Check if user is logged in and has the required role
  if (!currentUser || !roles.includes(currentUser.role)) {
    return <Navigate to="/login" />; // Redirect to login page if user is not logged in or doesn't have the required role
  }

  // Render the component if user is logged in and has the required role
  return <Route {...rest} element={<Element />} />;
};

export default PrivateRoute;
