import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.133.0/testing/asserts.ts";
import { Todo } from "./todo.ts";

class TodoList {
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

let todoList: TodoList;
function beforeEach() {
  todoList = new TodoList("Any category");
}

Deno.test("Should create a TodoList with a category", function () {
  beforeEach();
  const category = todoList.getCatedory();

  assertEquals(category, "Any category");
});

Deno.test("Should add a Todo in TodoList", function () {
  beforeEach();
  const todo1 = new Todo("Todo 1");
  const todo2 = new Todo("Todo 2");
  todoList.addTodo(todo1);
  todoList.addTodo(todo2);

  assert(todoList.getTodos().some((todo) => todo.getTitle() === "Todo 1"));
  assert(todoList.getTodos().some((todo) => todo.getTitle() === "Todo 2"));
  assertEquals(
    1,
    todoList.getTodos().filter((todo) => todo.getTitle() === "Todo 1").length,
  );
});
