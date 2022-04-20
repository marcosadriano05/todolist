import { assert, assertEquals, assertExists } from "../../external/tests.ts";

import { CreateTodoController } from "./todo_controllers.ts";

let createTodoController: CreateTodoController;
function beforeEach() {
  createTodoController = new CreateTodoController();
}

Deno.test("CreateTodoController: should return status 400 if no title is provided", async function () {
  beforeEach();

  const response = await createTodoController.handle({
    body: {
      description: "Any description",
    },
  });

  assertEquals(response.statusCode, 400);
  assertExists(response.body["message"]);
  assertEquals(response.body.message, "Title property is necessary.");
});

Deno.test("CreateTodoController: should return status 500 if an error occurs", async function () {
  beforeEach();

  const response = await createTodoController.handle({
    body: {
      title: "Any title",
      description: "Any description",
      startDate: new Date(Date.now() - 1000),
    },
  });

  assertEquals(response.statusCode, 500);
  assertExists(response.body.message);
});

Deno.test("CreateTodoController: should return status 201 on success", async function () {
  beforeEach();

  const response = await createTodoController.handle({
    body: {
      title: "Any title",
    },
  });

  assertEquals(response.statusCode, 201);
  assertExists(response.headers);
  assertExists(response.body.todoId);
  assert(
    response.headers.find((header) =>
      header.name === "Location" && header.value
    ),
  );
});
