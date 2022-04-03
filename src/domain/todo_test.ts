import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.133.0/testing/asserts.ts";
import { Todo } from "./todo.ts";
import { TodoError } from "./todo_error.ts";

Deno.test("Start date should accept date now", function () {
  const todo = new Todo();
  const dateNow = new Date(Date.now());

  assertEquals(todo.getStartDate(), dateNow);
});

Deno.test("Start date shouldn't be before now", function () {
  const todo = new Todo();
  const dateBeforeNow = new Date(Date.now() - 1);

  assertThrows(
    () => todo.setStartDate(dateBeforeNow),
    TodoError,
    "Start date should be greater or equals to now",
  );
});

Deno.test("Finish date shouldn't be equals to start date", function () {
  const todo = new Todo();
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
  const todo = new Todo();
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
