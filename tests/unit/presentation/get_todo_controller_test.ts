import {
  assertEquals,
  assertExists,
  beforeEach,
  describe,
  it,
  returnsNext,
  stub,
} from "/external/tests.ts";
import { HttpRequest } from "/src/presentation/controller.ts";
import { GetOneService } from "/src/services/todo_service.ts";
import { Todo, TodoType } from "/src/domain/todo/todo.ts";
import { GetTodoController } from "/src/presentation/get_todo_controller.ts";

const id = crypto.randomUUID();
const fakeTodo = new Todo("Fake todo", id);
const fakeTodoServiceResponse: TodoType = {
  id: fakeTodo.getId(),
  title: fakeTodo.getTitle(),
  description: fakeTodo.getTitle(),
  startDate: fakeTodo.getStartDate(),
  finishDate: fakeTodo.getFinishDate(),
  status: "Any status",
};

class FakeTodoService implements GetOneService<TodoType> {
  perform(_request: HttpRequest): Promise<TodoType> {
    return new Promise((resolve) => resolve(fakeTodoServiceResponse));
  }
}

let getTodoController: GetTodoController;
let fakeTodoService: FakeTodoService;
beforeEach(() => {
  fakeTodoService = new FakeTodoService();
  getTodoController = new GetTodoController(fakeTodoService);
});

describe("GetTodoController", () => {
  it("should return status 200 on success", async () => {
    const response = await getTodoController.handle({
      params: { id },
    });

    assertEquals(response.statusCode, 200);
    assertEquals(response.body, fakeTodoServiceResponse);
    assertEquals(response.body.id, id);
  });

  it("should return status 400 if id is not UUID", async () => {
    const response = await getTodoController.handle({
      params: { id: "any_id" },
    });

    assertEquals(response.statusCode, 400);
    assertExists(response.body.message);
    assertEquals(response.body.message, "Id should be UUID.");
  });

  it("should return status 404 if Todo was not found", async () => {
    stub(
      fakeTodoService,
      "perform",
      returnsNext([
        new Promise((_resolve, reject) => reject(null)),
      ]),
    );

    const response = await getTodoController.handle({
      params: { id },
    });

    assertEquals(response.statusCode, 404);
    assertExists(response.body.message);
    assertEquals(response.body.message, "Todo not found.");
  });

  it("should return status 400 if no id route param is provided", async () => {
    const response = await getTodoController.handle({});

    assertEquals(response.statusCode, 400);
    assertExists(response.body.message);
    assertEquals(response.body.message, "Todo id is missing.");
  });
});
