// users.js

const BASE_URL = 'http://localhost:8080';

export async function registerUser(name, email, password) {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        if (response.ok) {
            const user = await response.json();
            return user.id;
        } else {
            throw new Error('Failed to register user');
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return null;
    }
}

export async function authenticateUser(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const user = await response.json();
            return user;
        } else {
            throw new Error('Failed to authenticate user');
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return null;
    }
}
