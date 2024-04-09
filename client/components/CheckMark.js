import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { toggle } from '../api/todos';

export const CheckMark = ({ id, completed, toggleTodo }) => {

    const handlePress = () => {
        toggle(id, completed, toggleTodo);
    };

    return (
        <Pressable
            onPress={handlePress}
            style={[styles.checkMark, { backgroundColor: completed === 0 ? "#E9E9EF" : "#0EA5E9" }]}
        />
    );
}

const styles = StyleSheet.create({
    checkMark: {
        width: 20,
        height: 20,
        borderRadius: 7,
    }
});
