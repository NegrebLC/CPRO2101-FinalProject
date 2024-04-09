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

//intentionally vague to avoid revealing usernames that exist
export const loginError = (error, setError) => {
    if (error.response && (error.response.status === 400)||(error.response.status === 401)) {
        setError("Username or password is incorrect.");
    } else {
        setError("An unexpected error occurred while processing your request.");
    }
};
