export class Todo {
  constructor(id, title, completed = false, createdAt = new Date()) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.createdAt = createdAt;
  }

  // Business logic methods
  toggle() {
    this.completed = !this.completed;
    return this;
  }

  isCompleted() {
    return this.completed;
  }

  isNew() {
    const today = new Date();
    const diffTime = Math.abs(today - this.createdAt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1; // New if created within 1 day
  }

  getDisplayTitle() {
    return this.completed ? `✓ ${this.title}` : this.title;
  }
}
