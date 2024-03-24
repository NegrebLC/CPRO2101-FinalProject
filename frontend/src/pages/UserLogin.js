import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import FormInput from '../components/FormInput';

function UserLogin() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', formData.username);
        console.log('Password:', formData.password);
    };

    return (
        <Container>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <FormInput type="text" label="Username" name="username"
                    value={formData.username} onChange={handleChange}
                />
                <FormInput type="password" label="Password" name="password"
                    value={formData.password} onChange={handleChange}
                />
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
}

export default UserLogin;
