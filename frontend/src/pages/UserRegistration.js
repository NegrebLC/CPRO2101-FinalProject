import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import { validateUsername, validatePassword } from '../services/validation';

const UserRegistration = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        try{
            if (form.checkValidity() && user.password === user.confirmPassword) {
                const userData = {
                    username: user.username,
                    email: user.email,
                    password: user.password
                };
                const response = await axios.post('http://localhost:5000/api/users/create', userData);
                console.log('User created:', response.data);
                navigate('/login');
            }
        } catch (error) {
            setError(error.message);
        }
        setValidated(true); 
    };

    const handleUsernameChange = (e) => {
        setUser({ ...user, username: e.target.value });
    };
    const handlePasswordChange = (e) => { 
        setUser({ ...user, password: e.target.value });
    };

    const usernameError = validateUsername(user.username);
    const passwordError = validatePassword(user.password);
    const isValidUsername = !usernameError && !!user.username;
    const isValidPassword = !passwordError && !!user.password;


    return (
        <Layout title='User Registration'>
            <h2 className="display-3 mb-4 text-center">Register</h2>
            <div className="d-flex flex-column justify-content-center align-items-center">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username*</Form.Label>
                        <Form.Control
                            type="text" value={user.username || ''} required minLength={6} maxLength={30}
                            onChange={handleUsernameChange}
                            isInvalid={user.username && usernameError} isValid={user.username && isValidUsername}
                        />
                        {usernameError && (
                            <Form.Control.Feedback type="invalid">
                                {usernameError}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email*</Form.Label>
                        <Form.Control type='email' required 
                            pattern='^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$' value={user.email || ''} 
                            onChange={(e) => setUser({...user, email: e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email address. 
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control
                        type="password" value={user.password || ''} required minLength={6} maxLength={30}
                        onChange={handlePasswordChange}
                        pattern='(?=.*[!@#$%^&*(),.?":{}|<>0-9])(?=.*[A-Z])(?=.*[a-z]).{6,30}'
                        isInvalid={user.password && passwordError} isValid={user.password && isValidPassword}
                    />
                        {passwordError && (
                            <Form.Control.Feedback type="invalid">
                                {passwordError}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password" required
                            value={user.confirmPassword}
                            onChange={(e) => setUser({...user, confirmPassword: e.target.value})} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Please confirm your password.
                        </Form.Control.Feedback>
                        {user.password !== user.confirmPassword && (
                            <Form.Text className="text-danger">
                                Passwords do not match.
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        </Layout>
    );
}

export default UserRegistration;