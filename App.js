import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ToDoScreen from "./src/presentation/screens/ToDoScreen.jsx";

export default function App() {
  return <ToDoScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
