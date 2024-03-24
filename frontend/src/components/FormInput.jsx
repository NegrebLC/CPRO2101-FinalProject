import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';

const FormInput = ({ type, label, value, name , onChange, required, pattern }) => {    
    const [errorMessage, setErrorMessage] = useState('');
    
    const patterns = {
        email: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,63}$/,
        phone: /^\(\d{3}\)\d{3}-\d{4}$/,
    };
    
    //if provided use pattern, else if use predefined type pattern, else null pattern
    let finalPattern = pattern || patterns[type] || null; 

    const handleValidation = (e) => {
        const input = e.target;

        if (required && input.value.trim() === '') {
            //send error if required field is left blank
            setErrorMessage(`Invalid ${label.toLowerCase()} field.`);
        } else if (finalPattern && !input.value.match(finalPattern)) {
            //send error if field does not match pattern
            setErrorMessage(`Invalid ${label.toLowerCase()} field.`);
        } else {
            //clear error if data valid
            setErrorMessage('');
        }
    };

    return (
        <>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form.Group className="mb-3" controlId={`form${label.replace(/\s+/g, '')}`}>
                <Form.Label>
                    {label}
                    {required && <span>*</span>}
                </Form.Label>
                <Form.Control
                    type={type}
                    placeholder={`Type ${label} Here`}
                    value={value || ''}
                    name={name}
                    onChange={(e) => {
                        onChange(e);
                        handleValidation(e);
                    }}
                    required={required}
                    pattern={finalPattern}
                />
            </Form.Group>
        </>
    );
}

export default FormInput;
