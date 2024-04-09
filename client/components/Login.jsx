import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { loginUser } from '../utils/api';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');

    const handleLogin = async () => {
        try {
            // Verificar si el campo de correo electrónico está vacío
            if (!email) {
                console.error('Por favor ingrese su correo electrónico');
                return;
            }

            // Intentar iniciar sesión sin contraseña
            const response = await fetch('http://localhost:8080/users');
            if (!response.ok) {
                throw new Error('Error fetching users');
            }
            const users = await response.json();
            const user = users.find(user => user.email === email);

            // Si el usuario no existe, crear uno con nombre y contraseña por defecto
            if (!user) {
                const newUser = { email, name: 'Usuario', password: 'password' };
                onLogin(newUser);
                console.log('Nuevo usuario creado:', newUser);
                return;
            }

            // Si el usuario existe, iniciar sesión con su información
            onLogin(user);
            console.log('Usuario autenticado:', user);
        } catch (error) {
            console.error('Error en inicio de sesión:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                textContentType="username"
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default Login;
