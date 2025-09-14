import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { ToDoItem } from "./TodoItem.jsx";

export const ToDoList = ({
  todos,
  onAddTodo,
  onToggleTodo,
  loading,
  error,
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      onAddTodo(newTodoTitle.trim());
      setNewTodoTitle("");
    }
  };

  const handleToggle = (todoId) => {
    onToggleTodo(todoId);
  };

  React.useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  const completedCount = todos.filter((todo) => todo.isCompleted()).length;
  const totalCount = todos.length;

  const renderTodo = ({ item }) => (
    <ToDoItem todo={item} onToggle={handleToggle} />
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No todos yet.</Text>
      <Text style={styles.emptySubtext}>Add one above to get started!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Todo List</Text>
        <Text style={styles.stats}>
          {completedCount}/{totalCount} completed
        </Text>
      </View>

      {/* Add Todo Form */}
      <View style={styles.addTodoContainer}>
        <TextInput
          style={styles.input}
          value={newTodoTitle}
          onChangeText={setNewTodoTitle}
          placeholder="Add new todo..."
          maxLength={100}
          editable={!loading}
          onSubmitEditing={handleAddTodo}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[
            styles.addButton,
            !newTodoTitle.trim() || loading ? styles.addButtonDisabled : null,
          ]}
          onPress={handleAddTodo}
          disabled={!newTodoTitle.trim() || loading}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Loading indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading todos...</Text>
        </View>
      )}

      {/* Todo List */}
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={!loading ? renderEmptyList : null}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  stats: {
    fontSize: 14,
    color: "#666",
  },
  addTodoContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonDisabled: {
    backgroundColor: "#ccc",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    color: "#666",
    fontSize: 16,
  },
  list: {
    flex: 1,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    fontWeight: "500",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 8,
  },
});
