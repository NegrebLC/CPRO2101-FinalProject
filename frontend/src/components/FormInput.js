import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';

const FormInput = ({ type, label, value, name , onChange, required, pattern, minLength, maxLength, errorMessage }) => {    
    const [predefinedErrorMessage, setErrorMessage] = useState('');
    
    const patterns = {
        email: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,63}$/,
        phone: /^\(\d{3}\)\d{3}-\d{4}$/,
    };
    
    //if provided use pattern, else if use predefined type pattern, else null pattern
    let finalPattern = pattern || patterns[type] || null; 

    const handleValidation = (e) => {
        const input = e.target;
        const inputValue = input.value.trim();
    
        if (required && inputValue === '') {
            setErrorMessage(errorMessage || `Invalid ${label.toLowerCase()} field.`);
        } else if (finalPattern && !inputValue.match(finalPattern)) {
            setErrorMessage(errorMessage || `Invalid ${label.toLowerCase()} field.`);
        } else if (minLength && inputValue.length < minLength) {
            setErrorMessage(errorMessage || `Please enter at least ${minLength} characters.`);
        } else if (maxLength && inputValue.length > maxLength) {
            setErrorMessage(errorMessage || `Please enter at most ${maxLength} characters.`);
        } else {
            setErrorMessage('');
        }
    };
    

    return (
        <>
            {predefinedErrorMessage && <Alert variant="danger">{predefinedErrorMessage}</Alert>}
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
                    minLength={minLength}
                    maxLength={maxLength}
                />
            </Form.Group>
        </>
    );
}

export default FormInput;
