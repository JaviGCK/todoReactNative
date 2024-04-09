import React, { useState } from 'react';
import { TextInput, View, Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { addNewTask } from '../utils/api';

const NewTaskInput = ({ onAddTask }) => {
    const [task, setTask] = useState('');

    const handleAddTask = async () => {
        if (task.trim() !== '') {
            try {
                const newTask = await addNewTask(1, task);
                onAddTask(newTask);
                setTask('');
            } catch (error) {
                console.error(error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nueva tarea..."
                value={task}
                onChangeText={setTask}
            />
            <Pressable onPress={handleAddTask}>
                <AntDesign name="pluscircleo" size={24} color="black" />
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
        borderColor: 'gray',
        backgroundColor: '#fff',
        fontSize: 16,
    },
});

export default NewTaskInput;
