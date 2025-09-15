export class GetTodosUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async execute() {
    try {
      const todos = await this.todoRepository.getTodos();

      // Business logic: Sort by completion status and creation date
      return todos.sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1; // Incomplete first
        }
        return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
      });
    } catch (error) {
      throw new Error(`Failed to get todos: ${error.message}`);
    }
  }
}
