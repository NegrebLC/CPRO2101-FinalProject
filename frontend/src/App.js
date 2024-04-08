import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import NoAccess from "./pages/NoAccess";
import UserSupport from "./pages/support/ChatPage";
import AgentLoginPage from "./pages/support/AgentLoginPage";
import UserRegistration from "./pages/UserRegistration";
import Login from "./pages/UserLogin";
import CreatureSelect from "./pages/CreatureSelect";
import CreatureInteract from "./pages/CreatureInteract";
import Logout from "./pages/Logout";
import PrivateRoute from "./context/PrivateRoute";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/creature-select"
            element={
              <PrivateRoute
                element={CreatureSelect}
                roles={["user"]}
                redirectPath="/no-access"
              />
            }
          />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/no-access" element={<NoAccess />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/support"
            element={
              <PrivateRoute
                element={UserSupport}
                roles={["user", "agent"]}
                redirectPath="/no-access"
              />
            }
          />
          <Route path="/agents/login" element={<AgentLoginPage />} />
          <Route path="/my-creature" element={<CreatureInteract />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
