import { Todo } from "./todo.ts";

export class TodoList {
  private todos: Todo[];
  private category: string;

  constructor(category: string) {
    this.todos = [];
    this.category = category;
  }

  public getCatedory(): string {
    return this.category;
  }

  public addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  public getTodos(): Todo[] {
    return this.todos;
  }
}
