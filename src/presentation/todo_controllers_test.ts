import { assertEquals, assertExists } from "../../external/tests.ts";

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
