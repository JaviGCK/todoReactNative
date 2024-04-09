import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { InputTask } from "./components/InputTask";
import { Task } from "./components/Task";
import { fetchData } from "./api/todos";

export default function App() {
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
    <GestureHandlerRootView style={styles.flex1}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
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
              ListHeaderComponent={() => (
                <Text style={styles.title}>Today</Text>
              )}
              contentContainerStyle={styles.contentContainerStyle}
            />
            <InputTask todos={todos} setTodos={setTodos} />
          </SafeAreaView>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#E9E9EF",
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
