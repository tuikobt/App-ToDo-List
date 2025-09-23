import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import ToDoList from "../components/ToDoList.jsx";
import { useTodos } from "../hooks/useTodos.js";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function ToDoScreen() {
  const { todos, loading, error, addTodo, toggleTodo } = useTodos();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <ToDoList
          todos={todos}
          onAddTodo={addTodo}
          onToggleTodo={toggleTodo}
          loading={loading}
          error={error}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
