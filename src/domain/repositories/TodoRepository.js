// Interface/Contract for Todo repository
export class TodoRepository {
  async getTodos() {
    throw new Error("getTodos method must be implemented");
  }

  async addTodo(todo) {
    throw new Error("addTodo method must be implemented");
  }

  async updateTodo(todo) {
    throw new Error("updateTodo method must be implemented");
  }

  async deleteTodo(id) {
    throw new Error("deleteTodo method must be implemented");
  }
}
