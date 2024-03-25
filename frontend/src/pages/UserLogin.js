import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Layout from '../components/Layout';

function UserLogin() {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        try{
            if (form.checkValidity()){
                console.log('Submitted: ', user); 
            }
            
        } catch (error) {
            setError(error.message);
        }
        setValidated(true);
    };

    return (
        <Layout title='Login'>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formUserame">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text'
                        required value={user.username || ''} 
                        onChange={(e) => setUser({...user, username: e.target.value})}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide your username.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password'
                        required value={user.password || ''} 
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide your password.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Login
                </Button>
            </Form>
        </Layout>
    );
}

export default UserLogin;
