import { assert, assertEquals, assertThrows } from "../../../external/tests.ts";
import { v4 } from "../../../external/uuid.ts";
import { Todo } from "./todo.ts";
import { TodoError } from "./todo_error.ts";

let todo: Todo;

function beforeEach() {
  todo = new Todo("Any title");
}

Deno.test("Todo: should be created with a random uuid id", function () {
  beforeEach();
  const id = todo.getId();

  assert(v4.validate(id));
});

Deno.test("Todo: should be created with a title", function () {
  beforeEach();
  const title = todo.getTitle();

  assertEquals(title, "Any title");
});

Deno.test("Todo: should be created with an undefined start and finish date", function () {
  beforeEach();
  const startDate = todo.getStartDate();
  const finishDate = todo.getFinishDate();

  assertEquals(startDate, undefined);
  assertEquals(finishDate, undefined);
});

Deno.test("Todo: should be possible edit title", function () {
  beforeEach();
  todo.setTitle("Edited title");
  const title = todo.getTitle();

  assertEquals(title, "Edited title");
});

Deno.test("Todo: should set a description", function () {
  beforeEach();
  todo.setDescription("Any description");
  const description = todo.getDescription();

  assertEquals(description, "Any description");
});

Deno.test("Todo: start date shouldn't be before now", function () {
  beforeEach();
  const dateBeforeNow = new Date(Date.now() - 1);

  assertThrows(
    () => todo.setStartDate(dateBeforeNow),
    TodoError,
    "Start date should be greater or equals to now.",
  );
});

Deno.test("Todo: finish date shouldn't be equals to start date", function () {
  beforeEach();
  const dateNowPlus1000ms = new Date(Date.now() + 1000);
  todo.setStartDate(dateNowPlus1000ms);
  const startDate = todo.getStartDate();
  let dateStart: Date;
  if (startDate) {
    dateStart = new Date(startDate.getTime());
  }

  assertThrows(
    () => todo.setFinishDate(dateStart),
    TodoError,
    "Finish date should be greater than start date.",
  );
});

Deno.test("Todo: finish date shouldn't be before or equals to start date", function () {
  beforeEach();
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
    "Finish date should be greater than start date.",
  );
});

Deno.test("Todo: should get the status INCOMPLETE when is created", function () {
  beforeEach();
  const status = todo.getStatus();

  assertEquals(status, "INCOMPLETE");
});
