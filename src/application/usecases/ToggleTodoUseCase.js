export class ToggleTodoUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async execute(todoId) {
    if (!todoId) {
      throw new Error("Todo ID is required");
    }

    try {
      const todos = await this.todoRepository.getTodos();
      const todo = todos.find((t) => t.id === todoId);

      if (!todo) {
        throw new Error("Todo not found");
      }

      todo.toggle(); // Use domain method
      return await this.todoRepository.updateTodo(todo);
    } catch (error) {
      throw new Error(`Failed to toggle todo: ${error.message}`);
    }
  }
}
