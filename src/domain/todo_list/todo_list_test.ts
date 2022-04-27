import {
  assert,
  assertEquals,
  assertThrows,
  beforeEach,
  describe,
  it,
} from "../../../external/tests.ts";
import { v4 } from "../../../external/uuid.ts";
import { Todo } from "../todo/todo.ts";
import { TodoList } from "./todo_list.ts";
import { TodoListError } from "./todo_list_error.ts";

let todoList: TodoList;
let todo1: Todo;
let todo2: Todo;
let todo3: Todo;
let todo4: Todo;
beforeEach(() => {
  todoList = new TodoList("Any category");

  todo1 = new Todo("Todo 1");
  todo2 = new Todo("Todo 2");
  todo3 = new Todo("Todo 3");
  todo4 = new Todo("Todo 4");
  todoList.addTodo(todo1);
  todoList.addTodo(todo2);
  todoList.addTodo(todo3);
  todoList.addTodo(todo4);
});

describe("TodoList", () => {
  it("should create a TodoList with a category", () => {
    const category = todoList.getCatedory();

    assertEquals(category, "Any category");
  });

  it("should be created with a random uuid id", () => {
    const todoListId = todoList.getId();

    assert(v4.validate(todoListId));
  });

  it("should add a Todo in TodoList", () => {
    assert(todoList.getTodos().some((todo) => todo.getTitle() === "Todo 1"));
    assert(todoList.getTodos().some((todo) => todo.getTitle() === "Todo 2"));
    assertEquals(
      1,
      todoList.getTodos().filter((todo) => todo.getTitle() === "Todo 1").length,
    );
  });

  it("should remove a Todo with specific id", () => {
    const todoId = todo1.getId();
    todoList.removeTodo(todoId);

    assertEquals(
      todoList.getTodos().find((todo) => todo.getTitle() === "Todo 1"),
      undefined,
    );
  });

  it("should throw an error if Todo id is not present", () => {
    assertThrows(
      () => todoList.removeTodo("Any id"),
      TodoListError,
      "Todo not found in the list.",
    );
  });

  it("should order Todos by status [DOING, INCOMPLETE, READY, DONE]", () => {
    const dateNow = new Date();
    const dateNowPlus1000ms = new Date(Date.now() + 1000);
    const dateNowPlus2000ms = new Date(Date.now() + 2000);
    // DOING
    todo1.setStartDate(dateNow);
    todo1.setFinishDate(dateNowPlus1000ms);
    // DONE
    todo3.setStartDate(dateNow);
    todo3.setFinishDate(dateNow);
    // READY
    todo2.setStartDate(dateNowPlus1000ms);
    todo2.setFinishDate(dateNowPlus2000ms);

    const todos = todoList.getTodos();

    assertEquals(todos[0].getTitle(), "Todo 1");
    assertEquals(todos[1].getTitle(), "Todo 4");
    assertEquals(todos[2].getTitle(), "Todo 2");
    assertEquals(todos[3].getTitle(), "Todo 3");
  });
});
