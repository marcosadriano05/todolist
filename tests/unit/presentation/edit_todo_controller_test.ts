import {
  assertEquals,
  assertExists,
  assertSpyCalls,
  beforeEach,
  describe,
  it,
  spy,
} from "/external/tests.ts";
import { HttpRequest } from "/src/presentation/controller.ts";
import { GetOneService } from "/src/services/todo_service.ts";
import { Todo } from "/src/domain/todo/todo.ts";
import { EditTodoController } from "/src/presentation/edit_todo_controller.ts";

const fakeId = crypto.randomUUID();

class FakeEditTodoService implements GetOneService<Todo> {
  perform(request: HttpRequest): Promise<Todo> {
    const todo = new Todo("Any Todo", fakeId);
    return new Promise((resolve) => resolve(todo));
  }
}

let editTodoController: EditTodoController;
let fakeEditTodoService: FakeEditTodoService;
beforeEach(() => {
  fakeEditTodoService = new FakeEditTodoService();
  editTodoController = new EditTodoController(fakeEditTodoService);
});

describe("EditTodoController", () => {
  it("should return status 400 if no id param is passed", async () => {
    const response = await editTodoController.handle({});

    assertEquals(response.statusCode, 400);
    assertExists(response.body["message"]);
    assertEquals(response.body.message, "The route must have an id.");
  });

  it("should not call EditTodoService.perform if body has no properties", async () => {
    const performSpy = spy(fakeEditTodoService, "perform");
    await editTodoController.handle({
      params: {
        id: fakeId,
      },
    });
    assertSpyCalls(performSpy, 0);
  });

  it("should return status 400 if no body param is provided", async () => {
    const response = await editTodoController.handle({
      params: {
        id: fakeId,
      },
    });

    assertEquals(response.statusCode, 400);
    assertExists(response.body["message"]);
    assertEquals(
      response.body.message,
      "The body should have one or more params.",
    );
  });
});
