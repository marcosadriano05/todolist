import { assertEquals } from "../../../external/tests.ts";

import { TodoStatus } from "./todo_status.ts";

let todoStatus: TodoStatus;

function beforeEach() {
  todoStatus = new TodoStatus();
}

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

Deno.test("Todo: status should be DOING if date is between startDate and finishDate", function () {
  beforeEach();
  const dateNow = new Date(Date.now());
  const dateNowPlus1000ms = new Date(Date.now() + 1000);
  const status = todoStatus.checkStatusByDate(dateNow, dateNowPlus1000ms);

  assertEquals(status, "DOING");
});
