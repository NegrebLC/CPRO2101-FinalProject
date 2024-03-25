import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Layout from '../components/Layout';


const UserRegistration = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        try{
            if (form.checkValidity() && user.password === user.confirmPassword) {
                console.log('Submitted: ', user); //http put/post requests here
            } 
        } catch (error) {
            setError(error.message);
        }
        setValidated(true);
    };

    return (
        <Layout title='User Registration'>
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

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password"
                        value={user.password || ''} minLength={6}
                        onChange={(e) => setUser({...user, password: e.target.value})} 
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a password with at least 6 characters.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
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
        </Layout>
    );
}

export default UserRegistration;
