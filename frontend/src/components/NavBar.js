import React from "react";
import { Link } from "react-router-dom"; // Importing Link so that the navbar can navigate using routes
import { useAuth } from "../context/AuthContext";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// This function creates the navbar for the layout and returns it
export default function NavBar() {
  const { currentUser } = useAuth();
  
  return (
    <Navbar bg="secondary" variant="dark" expand="lg">
      <Navbar.Brand href="/home">Fugglets!</Navbar.Brand>
      {currentUser && <Navbar.Text className="px-3">Welcome, {currentUser.username}!</Navbar.Text>}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
          <Nav.Link as={Link} to="/creature-select">My Fugglet</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/support">Support</Nav.Link>
        </Nav>
        <Nav>
          {currentUser ? (
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
