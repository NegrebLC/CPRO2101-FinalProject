import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import UserSupport from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import AgentLoginPage from "./pages/AgentLoginPage";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<UserSupport />} />
          <Route path="/agents/login" element={<AgentLoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
