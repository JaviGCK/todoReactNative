import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, Pressable, Modal, TouchableOpacity } from 'react-native';
import { getUserTodos, deleteTodo } from '../utils/api';
import NewTaskInput from './NewTaskInput';

const ToDoList = ({ user, onLogout }) => {
    const [todos, setTodos] = useState([]);
    const [longPressedTask, setLongPressedTask] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchUserTodos = async () => {
            const data = await getUserTodos(user.id);
            setTodos(data);
        };

        fetchUserTodos();
    }, [user]);

    const addTask = async (newTask) => {
        setTodos([...todos, newTask]);
    };

    const removeTask = async (taskId) => {
        try {
            await deleteTodo(taskId);
            setTodos(todos.filter(task => task.id !== taskId));
        } catch (error) {
            Alert.alert('Error', 'Failed to delete task');
            console.error('Error deleting task:', error);
        }
    };

    const handleLongPressTask = (taskId) => {
        setLongPressedTask(taskId);
        setShowDeleteModal(true);
    };

    const handleDeleteTask = () => {
        removeTask(longPressedTask);
        setShowDeleteModal(false);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Lista de Tareas</Text>
                <Button title="Logout" onPress={onLogout} />
            </View>
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <Pressable
                        onLongPress={() => handleLongPressTask(item.id)}
                    >
                        <View style={styles.todoItem}>
                            <Text>{item.title}</Text>
                        </View>
                    </Pressable>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <NewTaskInput onAddTask={addTask} />
            <Modal
                visible={showDeleteModal}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Do you want to delete the task?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={handleDeleteTask}>
                                <Text style={styles.deleteButton}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCloseModal}>
                                <Text style={styles.cancelButton}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        margin: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
    },
    deleteButton: {
        fontSize: 16,
        color: 'red',
        marginRight: 10,
    },
    cancelButton: {
        fontSize: 16,
        color: 'blue',
    },
});

export default ToDoList;
