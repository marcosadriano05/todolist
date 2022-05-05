import {
  assert,
  assertEquals,
  assertExists,
  beforeEach,
  describe,
  it,
} from "/external/tests.ts";
import { Todo } from "/src/domain/todo/todo.ts";
import { HttpRequest } from "/src/presentation/controller.ts";

import { CreateTodoController } from "/src/presentation/create_todo_controller.ts";
import { TodoService } from "/src/services/todo_service.ts";

class FakeCreateTodoService implements TodoService {
  perform(request: HttpRequest): Promise<Todo> {
    const todo = new Todo(request.body.title);
    todo.setDescription(request.body.description);
    todo.setStartDate(request.body.startDate);
    return new Promise((resolve) => resolve(todo));
  }
}

let createTodoController: CreateTodoController;
beforeEach(() => {
  createTodoController = new CreateTodoController(new FakeCreateTodoService());
});

describe("CreateTodoController", () => {
  it("should return status 400 if no title is provided", async () => {
    const response = await createTodoController.handle({
      body: {
        description: "Any description",
      },
    });

    assertEquals(response.statusCode, 400);
    assertExists(response.body["message"]);
    assertEquals(response.body.message, "Title property is necessary.");
  });

  it("should return status 500 if an error occurs", async () => {
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

  it("should return status 201 on success", async () => {
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
});
