import { Todo } from "./todo.ts";
import { TodoListError } from "./todo_list_error.ts";

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

  public removeTodo(id: string) {
    if (!this.todos.some((todo) => todo.getId() === id)) {
      throw new TodoListError("Todo not found in the list");
    }
    this.todos = this.todos.filter((todo) => todo.getId() !== id);
  }
}
