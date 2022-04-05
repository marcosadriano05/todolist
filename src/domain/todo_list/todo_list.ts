import { Todo } from "../todo/todo.ts";
import { TodoListError } from "./todo_list_error.ts";

export class TodoList {
  private id: string;
  private todos: Todo[];
  private category: string;

  constructor(category: string) {
    this.id = crypto.randomUUID();
    this.todos = [];
    this.category = category;
  }

  public getId(): string {
    return this.id;
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

  public removeTodo(id: string) {
    if (!this.todos.some((todo) => todo.getId() === id)) {
      throw new TodoListError("Todo not found in the list");
    }
    this.todos = this.todos.filter((todo) => todo.getId() !== id);
  }
}
