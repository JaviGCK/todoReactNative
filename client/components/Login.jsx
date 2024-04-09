import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { loginUser } from '../utils/api';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');

    const handleLogin = async () => {
        try {
            if (!email) {
                console.error('Please enter your email');
                return;
            }

            const response = await fetch('http://localhost:8080/users');
            if (!response.ok) {
                throw new Error('Error fetching users');
            }
            const users = await response.json();
            const user = users.find(user => user.email === email);

            if (!user) {
                const newUser = { email, name: 'User', password: 'password' };
                onLogin(newUser);
                console.log('New user created:', newUser);
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
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                textContentType="username"
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
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
    input: {
        width: '100%',
        height: 40,
        borderColor: '#1124b4',
        borderRadius: 15,
        borderWidth: 1,
        marginBottom: 40,
        paddingHorizontal: 10,
        color: '#1124b4'
    },
    loginButton: {
        backgroundColor: '#1124b4',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Login;
