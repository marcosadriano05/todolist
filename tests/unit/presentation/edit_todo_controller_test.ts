import {
  assertEquals,
  assertExists,
  assertSpyCalls,
  beforeEach,
  describe,
  it,
  returnsNext,
  spy,
  stub,
} from "/deps/tests.ts";
import { HttpRequest } from "/src/presentation/controller.ts";
import { GetOneService } from "/src/services/todo_service.ts";
import { Todo, TodoType } from "/src/domain/todo/todo.ts";
import { EditTodoController } from "/src/presentation/edit_todo_controller.ts";

const fakeId = crypto.randomUUID();
const fakeTodo = new Todo("Any Todo", fakeId);

class FakeEditTodoService implements GetOneService<TodoType> {
  perform(request: HttpRequest): Promise<TodoType> {
    return new Promise((resolve) =>
      resolve({
        id: fakeTodo.getId(),
        title: fakeTodo.getTitle(),
        description: fakeTodo.getTitle(),
        startDate: fakeTodo.getStartDate(),
        finishDate: fakeTodo.getFinishDate(),
        status: "Any status",
      })
    );
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

  it("should return status 200 on success", async () => {
    const response = await editTodoController.handle({
      params: {
        id: fakeId,
      },
      body: {
        title: "Any Todo",
      },
    });

    assertEquals(response.statusCode, 200);
    assertEquals(
      response.body.title,
      "Any Todo",
    );
    assertEquals(response.body.id, fakeId);
  });

  it("should return status 500 service throws", async () => {
    stub(
      fakeEditTodoService,
      "perform",
      returnsNext([new Promise((resolve, reject) => reject(null))]),
    );
    const response = await editTodoController.handle({
      params: {
        id: fakeId,
      },
      body: {
        title: "Any Todo",
      },
    });

    assertEquals(response.statusCode, 500);
    assertExists(response.body["message"]);
    assertEquals(
      response.body.message,
      "Error to edit Todo.",
    );
  });
});
