import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Layout from "../components/Layout";

function UserLogin() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      if (form.checkValidity()) {
        const userData = {
          username: user.username,
          password: user.password,
        };
        await login({ ...user, role: "user" });
        navigate("/home");
        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          userData
        );
      }
    } catch (error) {
      setError(error.message);
    }
    setValidated(true);
  };

  return (
    <Layout title="Login">
      <h2 className="display-3 mb-4 text-center">Login</h2>
      <div className="d-flex flex-column justify-content-center align-items-center">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUserame">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              required
              value={user.username || ""}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Please provide your username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={user.password || ""}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Please provide your password.
            </Form.Control.Feedback>
          </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
        </Form>
      </div>
    </Layout>
  );
}

export default UserLogin;
