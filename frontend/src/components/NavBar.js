import React from "react";
import { Link } from "react-router-dom"; // Importing Link so that the navbar can navigate using routes
import { useAuth } from "../context/AuthContext";

// This function creates the navbar for the layout and returns it
export default function NavBar() {
  const { currentUser, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg bg-secondary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand">Fugglets!</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target=".navbar-collapse"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
          <ul className="navbar-nav flex-grow-1">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/creature-select">
                My Fugglet
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/support">
                Support
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/logout">
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
