import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './components/Login';
import ToDoList from './components/ToDoList';

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (userData) => {
    console.log('Usuario autenticado:', userData);
    setLoggedInUser(userData);
  };

  const handleLogout = () => {
    console.log('Usuario deslogueado');
    setLoggedInUser(null);
  };

  return (
    <View style={styles.container}>
      {loggedInUser ? (
        <ToDoList user={loggedInUser} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
