import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import { validateUsername, validatePassword, validateEmail, validateConfirmPassword } from '../services/validation';
import { code409Error } from '../services/errorHandler';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

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
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        try {
            if (form.checkValidity() && user.password === user.confirmPassword) {
                const userData = {
                    username: user.username,
                    email: user.email,
                    password: user.password
                };
                await axios.post('http://localhost:5000/api/users/create', userData);
                navigate('/login');
            }
        } catch (error) {
            code409Error(error, setError);
        }
        setValidated(true);
    };


    const handleShowPassword = () =>{
        setShowPassword(!showPassword);
    }
    const handleUsernameChange = (e) => {
        setUser({ ...user, username: e.target.value });
    };
    const handlePasswordChange = (e) => { 
        setUser({ ...user, password: e.target.value });
    };
    const handleEmailChange = (e) => { 
        setUser({ ...user, email: e.target.value });
    };
    const handleConfirmPasswordChange = (e) => { 
        setUser({ ...user, confirmPassword: e.target.value });
    };

    const usernameError = validateUsername(user.username);
    const passwordError = validatePassword(user.password);
    const emailError = validateEmail(user.email);
    const confirmPasswordError = validateConfirmPassword(user.confirmPassword, user.password)

    const isValidUsername = !usernameError && user.username;
    const isValidPassword = !passwordError && user.password;
    const isValidEmail = !emailError && user.email;
    const isValidConfirmPassword = !confirmPasswordError && user.confirmPassword;


    return (
        <Layout title='User Registration'>
            <h2 className="display-3 mb-4 text-center">Register</h2>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="col-md-6">
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
                                onChange={handleEmailChange}
                                isInvalid={user.email && emailError} isValid={user.email && isValidEmail}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid email address. 
                            </Form.Control.Feedback>
                        </Form.Group>

                        
                            <Form.Label>Password*</Form.Label>
                        <Form.Group className="mb-3 input-group" controlId="formPassword">
                                    <Form.Control
                                        type={ showPassword ? "text" : "password" } value={user.password || ''} required minLength={6} maxLength={30}
                                        onChange={handlePasswordChange}
                                        pattern='(?=.*[!@#$%^&*(),.?":{}|<>0-9])(?=.*[A-Z])(?=.*[a-z]).{6,30}'
                                        isInvalid={user.password && passwordError} isValid={user.password && isValidPassword}
                                    />
                                    <div>
                                <Button className="col-3 btn-info" onClick={handleShowPassword}>
                                    {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />} {/* Eye icons */}
                                </Button></div>
                                {passwordError && (
                                    <Form.Control.Feedback type="invalid">
                                        {passwordError}
                                    </Form.Control.Feedback>
                                )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type={ showPassword ? "text" : "password" } required
                                value={user.confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                pattern={user.password ? `(?=${user.password}).{6,30}` : ''}
                                isInvalid={user.confirmPassword && confirmPasswordError} isValid={user.confirmPassword && isValidConfirmPassword}
                                    />
                                {confirmPasswordError && (
                                    <Form.Control.Feedback type="invalid">
                                        {confirmPasswordError}
                                    </Form.Control.Feedback>
                                )}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </div>
            </div>
        </Layout>
    );
}

export default UserRegistration;