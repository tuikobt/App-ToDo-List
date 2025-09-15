import { useState, useEffect } from "react";
import { GetTodosUseCase } from "../../application/usecases/GetTodosUseCase.js";
import { AddTodoUseCase } from "../../application/usecases/AddTodoUseCase.js";
import { ToggleTodoUseCase } from "../../application/usecases/ToggleTodoUseCase.js";
import { AsyncStorageTodoRepository } from "../../infrastructure/repositories/AsyncStorageTodoRepository.js";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize use cases with repository
  const todoRepository = new AsyncStorageTodoRepository();
  const getTodosUseCase = new GetTodosUseCase(todoRepository);
  const addTodoUseCase = new AddTodoUseCase(todoRepository);
  const toggleTodoUseCase = new ToggleTodoUseCase(todoRepository);

  const loadTodos = async () => {
    setLoading(true);
    setError(null);

    try {
      const todoList = await getTodosUseCase.execute();
      setTodos(todoList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    try {
      await addTodoUseCase.execute(title);
      await loadTodos(); // Refresh list
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (todoId) => {
    try {
      await toggleTodoUseCase.execute(todoId);
      await loadTodos(); // Refresh list
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    refresh: loadTodos,
  };
};
