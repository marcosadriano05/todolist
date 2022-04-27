import {
  assertEquals,
  beforeEach,
  describe,
  it,
} from "../../../external/tests.ts";

import { TodoStatus } from "./todo_status.ts";

let todoStatus: TodoStatus;

beforeEach(() => {
  todoStatus = new TodoStatus();
});

describe("TodoStatus", () => {
  it("status should be INCOMPLETE when created", () => {
    const status = todoStatus.value;

    assertEquals(status, "INCOMPLETE");
  });

  it("status should be INCOMPLETE if start or finish date are undefined", () => {
    const status = todoStatus.checkStatusByDate(undefined, new Date());

    assertEquals(status, "INCOMPLETE");
  });

  it("status should be READY before reaching startDate", () => {
    const dateNowPlus1000ms = new Date(Date.now() + 1000);
    const dateNowPlus2000ms = new Date(Date.now() + 2000);
    const status = todoStatus.checkStatusByDate(
      dateNowPlus1000ms,
      dateNowPlus2000ms,
    );

    assertEquals(status, "READY");
  });

  it("status should be DOING if date is between startDate and finishDate", () => {
    const dateNow = new Date();
    const dateNowPlus1000ms = new Date(Date.now() + 1000);
    const status = todoStatus.checkStatusByDate(dateNow, dateNowPlus1000ms);

    assertEquals(status, "DOING");
  });

  it("status should be DONE if date is after finishDate", () => {
    const dateNowMinus1000ms = new Date(Date.now() - 1000);
    const dateNowMinus500ms = new Date(Date.now() - 500);
    const status = todoStatus.checkStatusByDate(
      dateNowMinus1000ms,
      dateNowMinus500ms,
    );

    assertEquals(status, "DONE");
  });

  it("status should be DONE if date is finishDate", () => {
    const dateNowMinus1000ms = new Date(Date.now() - 1000);
    const dateNow = new Date();
    const status = todoStatus.checkStatusByDate(
      dateNowMinus1000ms,
      dateNow,
    );

    assertEquals(status, "DONE");
  });

  it("status should be updated when checkStatusByDate is called", () => {
    const dateNowPlus1000ms = new Date(Date.now() + 1000);
    const dateNowPlus2000ms = new Date(Date.now() + 2000);
    todoStatus.checkStatusByDate(
      dateNowPlus1000ms,
      dateNowPlus2000ms,
    );

    assertEquals(todoStatus.value, "READY");
  });
});
