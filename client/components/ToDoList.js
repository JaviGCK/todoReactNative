import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import InputTask from "./InputTask.js";
import Task from "./Task.js";
import { fetchData } from "../api/todos.js";


export function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    async function fetchTodos() {
        try {
            const data = await fetchData();
            setTodos(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }

    function clearTodo(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    function toggleTodo(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
                    : todo
            )
        );
    }

    return (
        <SafeAreaView style={styles.flex1}>
            <FlatList
                data={todos}
                keyExtractor={(todo) => todo.id.toString()}
                renderItem={({ item }) => (
                    <Task
                        {...item}
                        toggleTodo={toggleTodo}
                        clearTodo={clearTodo}
                        fetchTodos={fetchTodos}
                    />
                )}
                ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
                contentContainerStyle={styles.contentContainerStyle}
            />
            <InputTask todos={todos} setTodos={setTodos} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    contentContainerStyle: {
        padding: 15,
    },
    title: {
        fontWeight: "800",
        fontSize: 28,
        marginBottom: 15,
    },
});
