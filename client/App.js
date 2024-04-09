import React from "react";
import { StyleSheet, View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TodoList from "./components/ToDoList";


export function App() {
  return (
    <GestureHandlerRootView style={styles.flex1}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <TodoList />
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
});
