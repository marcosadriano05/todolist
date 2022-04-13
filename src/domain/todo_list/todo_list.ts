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

  getId(): string {
    return this.id;
  }

  getCatedory(): string {
    return this.category;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  getTodos(): Todo[] {
    const sequence = ["DOING", "INCOMPLETE", "READY", "DONE"];
    return sequence.reduce((todos: Todo[], status) => {
      const filteredTodos = this.todos.filter((todo) =>
        todo.getStatus() === status
      );
      return todos.concat(filteredTodos);
    }, []);
  }

  removeTodo(id: string) {
    if (!this.todos.some((todo) => todo.getId() === id)) {
      throw new TodoListError("Todo not found in the list.");
    }
    this.todos = this.todos.filter((todo) => todo.getId() !== id);
  }
}
