import React from 'react';
import { Pressable, StyleSheet, Alert } from 'react-native';
import { toggleTodoCompletion } from '../utils/api';

const CheckMark = ({ id, completed, toggleTodo }) => {
    const toggle = async () => {
        try {
            await toggleTodoCompletion(id, !completed);
            toggleTodo(id);
            if (!completed) {
                Alert.alert('Congratulations', 'You completed a task!');
            }
        } catch (error) {
            console.error('Error toggling todo completion:', error);
        }
    };

    return (
        <Pressable
            onPress={toggle}
            style={[
                styles.checkMark,
                { backgroundColor: completed ? "#0EA5E9" : "#E9E9EF" },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    checkMark: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
});

export default CheckMark;
