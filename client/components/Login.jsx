import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { loginUser } from '../utils/api';

const Login = ({ onLogin }) => {
    const [selectedEmail, setSelectedEmail] = useState('');
    const emails = ['usuario1@example.com', 'usuario2@example.com'];

    const handleLogin = async () => {
        try {
            if (!selectedEmail) {
                console.error('Please select your email');
                return;
            }

            const response = await fetch('http://localhost:8080/users');
            if (!response.ok) {
                throw new Error('Error fetching users');
            }
            const users = await response.json();
            const user = users.find(user => user.email === selectedEmail);

            if (!user) {
                try {
                    const response = await fetch('http://localhost:8080/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: selectedEmail }),
                    });

                    if (!response.ok) {
                        throw new Error('Error creating new user');
                    }

                    const newUser = await response.json();

                    onLogin(newUser);
                    console.log('New user created:', newUser);
                } catch (error) {
                    console.error('Error creating new user:', error);
                }

                return;
            }

            onLogin(user);
            console.log('User authenticated:', user);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <View style={styles.container}>
            <AntDesign name="user" size={50} color="#1124b4" style={styles.icon} />
            <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownLabel}>Select an email:</Text>
                <View style={styles.dropdown}>
                    {emails.map(email => (
                        <TouchableOpacity
                            key={email}
                            style={[styles.dropdownItem, selectedEmail === email && styles.selectedItem]}
                            onPress={() => setSelectedEmail(email)}
                        >
                            <Text style={styles.dropdownItemText}>{email}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <TouchableOpacity
                style={[styles.loginButton, !selectedEmail && styles.disabledButton]}
                onPress={handleLogin}
                disabled={!selectedEmail} // Deshabilitar el botón si no hay correo electrónico seleccionado
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginBottom: 40,
    },
    dropdownContainer: {
        marginBottom: 40,
    },
    dropdownLabel: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1124b4',
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#1124b4',
        borderRadius: 15,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    dropdownItem: {
        paddingVertical: 8,
    },
    dropdownItemText: {
        fontSize: 16,
        color: '#1124b4',
        padding: 10
    },
    selectedItem: {
        backgroundColor: '#bbc2f4',
        borderRadius: 15,
    },
    loginButton: {
        backgroundColor: '#1124b4',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    disabledButton: {
        backgroundColor: '#adb8c6',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Login;
