import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.133.0/testing/asserts.ts";
import { Todo } from "./todo.ts";
import { TodoList } from "./todo_list.ts";

let todoList: TodoList;
let todo1: Todo;
let todo2: Todo;
function beforeEach() {
  todoList = new TodoList("Any category");

  todo1 = new Todo("Todo 1");
  todo2 = new Todo("Todo 2");
  todoList.addTodo(todo1);
  todoList.addTodo(todo2);
}

Deno.test("Should create a TodoList with a category", function () {
  beforeEach();
  const category = todoList.getCatedory();

  assertEquals(category, "Any category");
});

Deno.test("Should add a Todo in TodoList", function () {
  beforeEach();

  assert(todoList.getTodos().some((todo) => todo.getTitle() === "Todo 1"));
  assert(todoList.getTodos().some((todo) => todo.getTitle() === "Todo 2"));
  assertEquals(
    1,
    todoList.getTodos().filter((todo) => todo.getTitle() === "Todo 1").length,
  );
});

Deno.test("Should remove a Todo with specific id", function () {
  beforeEach();

  const todoId = todo1.getId();
  todoList.removeTodo(todoId);

  assertEquals(
    todoList.getTodos().find((todo) => todo.getTitle() === "Todo 1"),
    undefined,
  );
});
