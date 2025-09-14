import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const ToDoItem = ({ todo, onToggle }) => {
  const handlePress = () => {
    onToggle(todo.id);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        todo.isCompleted() ? styles.completed : styles.incomplete,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              todo.isCompleted()
                ? styles.completedTitle
                : styles.incompleteTitle,
            ]}
          >
            {todo.isCompleted() ? "✓ " : ""}
            {todo.getDisplayTitle()}
          </Text>

          {todo.isNew() && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          )}
        </View>

        <Text style={styles.date}>
          Created: {todo.createdAt.toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  completed: {
    backgroundColor: "#f0f8f0",
    opacity: 0.8,
  },
  incomplete: {
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  completedTitle: {
    color: "#666",
    textDecorationLine: "line-through",
  },
  incompleteTitle: {
    color: "#333",
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  newBadge: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
