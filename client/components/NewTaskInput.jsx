import React, { useState } from 'react';
import { TextInput, View, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { addNewTask } from '../utils/api';

const NewTaskInput = ({ userId, onAddTask }) => {
    const [task, setTask] = useState('');
    const [isTaskEmpty, setIsTaskEmpty] = useState(true);

    const handleAddTask = async () => {
        if (task.trim() !== '') {
            try {
                const newTask = await addNewTask(userId, task);
                onAddTask(newTask);
                setTask('');
            } catch (error) {
                console.error(error.message);
            }
        }
    };

    const handleChangeText = (text) => {
        setTask(text);
        setIsTaskEmpty(text.trim() === '');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nueva tarea..."
                value={task}
                onChangeText={handleChangeText}
            />
            <Pressable onPress={handleAddTask} disabled={isTaskEmpty}>
                <MaterialIcons name="send" size={24} color={isTaskEmpty ? '#adb8c6' : '#1124b4'} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 30,
    },
    input: {
        flex: 1,
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#7089ee',
        backgroundColor: '#fff',
        color: '#1124b4',
        fontSize: 24,
    },
});

export default NewTaskInput;
