import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import FormInput from '../components/FormInput';

function RegistrationPage() {
    const [formData, setFormData] = useState({
        username:'',
        email: '',
        password: '',
        confirmPassword: ''
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
        console.log(formData); //tb replaced
    };

    //sets value of password field to be a regex pattern, to verify with confirm password field
    const passwordPattern = new RegExp(`^${formData.password}$`);

    return (
        <Container>
            <h2>User Registration</h2>
            <Form onSubmit={handleSubmit}>
                <FormInput type="text" label="Username" name="username"
                    value={formData.username} onChange={handleChange} required
                />
                <FormInput type="email" label="Email" name="email"
                    value={formData.email} onChange={handleChange} required
                />
                <FormInput type="password" label="Password" name="password"
                    value={formData.password} onChange={handleChange} required
                    minLength={6}
                />
                <FormInput type="password" label="Confirm Password" name="confirmPassword"
                    pattern={passwordPattern} value={formData.confirmPassword}
                    onChange={handleChange} required errorMessage={'Passwords do not match'}
                />
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    );
}

export default RegistrationPage;
