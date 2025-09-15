import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoRepository } from "../../domain/repositories/TodoRepository.js";
import { Todo } from "../../domain/entities/Todo.js";

export class AsyncStorageTodoRepository extends TodoRepository {
  constructor() {
    super();
    this.storageKey = "@todos";
  }

  async getTodos() {
    try {
      const todosJson = await AsyncStorage.getItem(this.storageKey);
      if (!todosJson) return [];

      const todosData = JSON.parse(todosJson);
      return todosData.map(
        (data) =>
          new Todo(
            data.id,
            data.title,
            data.completed,
            new Date(data.createdAt)
          )
      );
    } catch (error) {
      console.error("Error loading todos:", error);
      return [];
    }
  }

  async addTodo(todo) {
    try {
      const todos = await this.getTodos();
      todos.push(todo);
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(todos));
      return todo;
    } catch (error) {
      throw new Error(`Failed to save todo: ${error.message}`);
    }
  }

  async updateTodo(updatedTodo) {
    try {
      const todos = await this.getTodos();
      const index = todos.findIndex((t) => t.id === updatedTodo.id);

      if (index === -1) {
        throw new Error("Todo not found");
      }

      todos[index] = updatedTodo;
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(todos));
      return updatedTodo;
    } catch (error) {
      throw new Error(`Failed to update todo: ${error.message}`);
    }
  }

  async deleteTodo(id) {
    try {
      const todos = await this.getTodos();
      const filteredTodos = todos.filter((t) => t.id !== id);
      await AsyncStorage.setItem(
        this.storageKey,
        JSON.stringify(filteredTodos)
      );
      return true;
    } catch (error) {
      throw new Error(`Failed to delete todo: ${error.message}`);
    }
  }
}
