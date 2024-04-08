import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';


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

    return (
        <Layout title='User Registration'>
            <h2 className="display-3 mb-4 text-center">Register</h2>
            <div className="d-flex flex-column justify-content-center align-items-center">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username*</Form.Label>
                        <Form.Control
                            type="text"  value={user.username || ''}
                            required onChange={(e) => setUser({...user, username: e.target.value})}
                        />

                        <Form.Control.Feedback type="invalid">
                            Please enter a username.
                        </Form.Control.Feedback>
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
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password"
                            value={user.password || ''} minLength={6}
                            onChange={(e) => setUser({...user, password: e.target.value})} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a password with at least 6 characters.
                        </Form.Control.Feedback>
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
