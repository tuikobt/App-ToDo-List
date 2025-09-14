import React from "react";
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { ToDoList } from "../components/ToDoList.jsx";
import { useTodos } from "../hooks/useTodos.js";

export const TodoScreen = () => {
  const { todos, loading, error, addTodo, toggleTodo } = useTodos();

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
