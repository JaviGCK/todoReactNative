import React from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getUserTodos, deleteTodo } from '../utils/api';
import NewTaskInput from './NewTaskInput';
import CheckMark from './CheckMark';

const windowWidth = Dimensions.get('window').width;

const ToDoList = ({ user, onLogout }) => {
    const [todos, setTodos] = React.useState([]);
    const [longPressedTask, setLongPressedTask] = React.useState(null);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);

    React.useEffect(() => {
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

    const toggleTodoCompletion = async (taskId) => {
        const updatedTodos = todos.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTodos(updatedTodos);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>To Do List</Text>
                <TouchableOpacity onPress={onLogout}>
                    <FontAwesome name="sign-out" size={24} color='#bbc2f4' />
                </TouchableOpacity>
            </View>
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onLongPress={() => handleLongPressTask(item.id)}
                        style={styles.todoItem}
                    >
                        <View style={styles.todoItemContent}>
                            <CheckMark
                                id={item.id}
                                completed={item.completed}
                                toggleTodo={toggleTodoCompletion}
                            />
                            <Text style={styles.taskText}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <NewTaskInput userId={user.id} onAddTask={addTask} />
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
        width: '100%',
        backgroundColor: '#f0f2f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        padding: 16,
        marginTop: 75,
        marginBottom: 25,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1124b4',
    },
    todoItem: {
        width: '100%',
    },
    todoItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        margin: 7,
        borderRadius: 15,
        backgroundColor: 'white',
        width: windowWidth * 0.90,
    },
    taskText: {
        fontSize: 16,
        marginLeft: 12,
        color: '#1124b4',
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
        color: '#383839',
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
