import {
  assert,
  assertEquals,
  assertThrows,
  beforeEach,
  describe,
  it,
} from "../../../external/tests.ts";
import { v4 } from "../../../external/uuid.ts";
import { Todo } from "./todo.ts";
import { TodoError } from "./todo_error.ts";

let todo: Todo;

beforeEach(() => {
  todo = new Todo("Any title");
});

describe("Todo", () => {
  it("should be able to pass a random id on creation", function () {
    const id = crypto.randomUUID();
    const todo = new Todo("Any title", id);
    const todoId = todo.getId();

    assert(v4.validate(todoId));
    assertEquals(todoId, id);
  });

  it("should be created with a random uuid id", () => {
    const id = todo.getId();

    assert(v4.validate(id));
  });

  it("should be created with a title", () => {
    const title = todo.getTitle();

    assertEquals(title, "Any title");
  });

  it("should be created with an undefined start and finish date", () => {
    const startDate = todo.getStartDate();
    const finishDate = todo.getFinishDate();

    assertEquals(startDate, undefined);
    assertEquals(finishDate, undefined);
  });

  it("should be possible edit title", () => {
    todo.setTitle("Edited title");
    const title = todo.getTitle();

    assertEquals(title, "Edited title");
  });

  it("should set a description", () => {
    todo.setDescription("Any description");
    const description = todo.getDescription();

    assertEquals(description, "Any description");
  });

  it("start date shouldn't be before now (error margin 5ms)", () => {
    const dateBeforeNow = new Date(Date.now() - 6);

    assertThrows(
      () => todo.setStartDate(dateBeforeNow),
      TodoError,
      "Start date should be greater or equals to now.",
    );
  });

  it("should set undefined if start or finish date string has a value 'null' or 'undefined'", () => {
    todo.setStartDate("null");
    todo.setFinishDate("undefined");

    assertEquals(undefined, todo.getStartDate());
    assertEquals(undefined, todo.getFinishDate());
  });

  it("finish date can be equals to start date", () => {
    const dateNowPlus1000ms = new Date(Date.now() + 1000);
    todo.setStartDate(dateNowPlus1000ms);
    todo.setFinishDate(dateNowPlus1000ms);
    assertEquals(todo.getFinishDate(), dateNowPlus1000ms);
  });

  it("finish date shouldn't be less than start date", () => {
    const dateNowPlus1000ms = new Date(Date.now() + 1000);
    todo.setStartDate(dateNowPlus1000ms);
    const startDate = todo.getStartDate();
    let dateBeforeStart: Date;
    if (startDate) {
      dateBeforeStart = new Date(startDate.getTime() - 1);
    }

    assertThrows(
      () => todo.setFinishDate(dateBeforeStart),
      TodoError,
      "Finish date should be greater or equals than start date.",
    );
  });

  it("should get the status INCOMPLETE when is created", () => {
    const status = todo.getStatus();

    assertEquals(status, "INCOMPLETE");
  });
});
