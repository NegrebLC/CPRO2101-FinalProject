import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import UserSupport from "./pages/support/ChatPage";
import AgentLoginPage from "./pages/support/AgentLoginPage";
import UserRegistration from "./pages/UserRegistration";
import Login from "./pages/UserLogin";
import CreatureSelect from "./pages/CreatureSelect";
import CreatureInteract from "./pages/CreatureInteract";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<UserSupport />} />
          <Route path="/agents/login" element={<AgentLoginPage />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/creature-select" element={<CreatureSelect />} />
          <Route path="/my-creature" element={<CreatureInteract />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
