export const code409Error = (error, setError) => {
    if (error.response && error.response.status === 409) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes('Username')) {
            setError("Username already exists.");
        } else if (errorMessage.includes('Email')) {
            setError("Email already exists.");
        } else {
            setError("Error sending user data");
        }
    } else {
        setError("An unexpected error occurred while processing your request.");
    }
};