import { Todo } from "../../domain/entities/Todo.js";

export class AddTodoUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async execute(title) {
    // Validation logic
    if (!title || title.trim().length === 0) {
      throw new Error("Todo title cannot be empty");
    }

    if (title.trim().length > 100) {
      throw new Error("Todo title cannot exceed 100 characters");
    }

    try {
      const todo = new Todo(
        Date.now().toString(), // Simple ID generation
        title.trim()
      );

      return await this.todoRepository.addTodo(todo);
    } catch (error) {
      throw new Error(`Failed to add todo: ${error.message}`);
    }
  }
}
