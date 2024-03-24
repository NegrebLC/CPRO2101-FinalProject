import { BrowserRouter, Routes, Route } from "react-router-dom"; //importing the react router dom to set my routes
import About from "./pages/About";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from "./pages/UserLogin";

export default function App() {
  //setting the app routes
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />{" "}
          {/* Setting a second home path for clean routing */}
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoPage />} />{" "}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
