import {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.133.0/testing/asserts.ts";
import { v4 } from "https://deno.land/std@0.133.0/uuid/mod.ts";
import { Todo } from "./todo.ts";
import { TodoError } from "./todo_error.ts";

let todo: Todo;

function beforeEach() {
  todo = new Todo("Any title");
}

Deno.test("Todo should be created with a random uuid id", function () {
  beforeEach();
  const id = todo.getId();

  assert(v4.validate(id));
});

Deno.test("Todo should be created with a title", function () {
  beforeEach();
  const title = todo.getTitle();

  assertEquals(title, "Any title");
});

Deno.test("Todo should be possible edit title", function () {
  beforeEach();
  todo.setTitle("Edited title");
  const title = todo.getTitle();

  assertEquals(title, "Edited title");
});

Deno.test("Todo should set a description", function () {
  beforeEach();
  todo.setDescription("Any description");
  const description = todo.getDescription();

  assertEquals(description, "Any description");
});

Deno.test("Start date should accept date now", function () {
  beforeEach();
  const dateNow = new Date(Date.now());

  assertEquals(todo.getStartDate(), dateNow);
});

Deno.test("Start date shouldn't be before now", function () {
  beforeEach();
  const dateBeforeNow = new Date(Date.now() - 1);

  assertThrows(
    () => todo.setStartDate(dateBeforeNow),
    TodoError,
    "Start date should be greater or equals to now",
  );
});

Deno.test("Finish date shouldn't be equals to start date", function () {
  beforeEach();
  const dateNowPlus1000ms = new Date(Date.now() + 1000);
  todo.setStartDate(dateNowPlus1000ms);
  const startDate = todo.getStartDate();
  const dateStart = new Date(startDate.getTime());

  assertThrows(
    () => todo.setFinishDate(dateStart),
    TodoError,
    "Finish date should be greater than start date",
  );
});

Deno.test("Finish date shouldn't be before or equals to start date", function () {
  beforeEach();
  const dateNowPlus1000ms = new Date(Date.now() + 1000);
  todo.setStartDate(dateNowPlus1000ms);
  const startDate = todo.getStartDate();
  const dateBeforeStart = new Date(startDate.getTime() - 1);

  assertThrows(
    () => todo.setFinishDate(dateBeforeStart),
    TodoError,
    "Finish date should be greater than start date",
  );
});
