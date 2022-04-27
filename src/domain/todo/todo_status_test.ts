import { assertEquals } from "../../../external/tests.ts";

import { TodoStatus } from "./todo_status.ts";

let todoStatus: TodoStatus;

function beforeEach() {
  todoStatus = new TodoStatus();
}

Deno.test("TodoStatus: status should be INCOMPLETE when created", function () {
  beforeEach();
  const status = todoStatus.value;

  assertEquals(status, "INCOMPLETE");
});

Deno.test("TodoStatus: status should be INCOMPLETE if start or finish date are undefined", function () {
  beforeEach();
  const status = todoStatus.checkStatusByDate(undefined, new Date());

  assertEquals(status, "INCOMPLETE");
});

Deno.test("TodoStatus: status should be READY before reaching startDate", function () {
  beforeEach();
  const dateNowPlus1000ms = new Date(Date.now() + 1000);
  const dateNowPlus2000ms = new Date(Date.now() + 2000);
  const status = todoStatus.checkStatusByDate(
    dateNowPlus1000ms,
    dateNowPlus2000ms,
  );

  assertEquals(status, "READY");
});

Deno.test("TodoStatus: status should be DOING if date is between startDate and finishDate", function () {
  beforeEach();
  const dateNow = new Date();
  const dateNowPlus1000ms = new Date(Date.now() + 1000);
  const status = todoStatus.checkStatusByDate(dateNow, dateNowPlus1000ms);

  assertEquals(status, "DOING");
});

Deno.test("TodoStatus: status should be DONE if date is after finishDate", function () {
  beforeEach();
  const dateNowMinus1000ms = new Date(Date.now() - 1000);
  const dateNowMinus500ms = new Date(Date.now() - 500);
  const status = todoStatus.checkStatusByDate(
    dateNowMinus1000ms,
    dateNowMinus500ms,
  );

  assertEquals(status, "DONE");
});

Deno.test("TodoStatus: status should be DONE if date is finishDate", function () {
  beforeEach();
  const dateNowMinus1000ms = new Date(Date.now() - 1000);
  const dateNow = new Date();
  const status = todoStatus.checkStatusByDate(
    dateNowMinus1000ms,
    dateNow,
  );

  assertEquals(status, "DONE");
});

Deno.test("TodoStatus: status should be updated when checkStatusByDate is called", function () {
  beforeEach();
  const dateNowPlus1000ms = new Date(Date.now() + 1000);
  const dateNowPlus2000ms = new Date(Date.now() + 2000);
  todoStatus.checkStatusByDate(
    dateNowPlus1000ms,
    dateNowPlus2000ms,
  );

  assertEquals(todoStatus.value, "READY");
});
