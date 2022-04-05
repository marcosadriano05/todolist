export class TodoListError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TodoListError";
  }
}
