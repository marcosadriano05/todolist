import { Todo, TodoType } from "/src/domain/todo/todo.ts";
import { HttpRequest } from "/src/presentation/controller.ts";
import {
  assertEquals,
  assertExists,
  beforeEach,
  describe,
  it,
  returnsNext,
  stub,
} from "/external/tests.ts";
import { GetAllTodoController } from "/src/presentation/get_all_todo_controller.ts";
import { GetAllService } from "/src/services/todo_service.ts";

const fakeTodos: Todo[] = [
  new Todo("Todo 1"),
  new Todo("Todo 2"),
];

const fakeTodoServiceResponse: TodoType[] = fakeTodos.map((fakeTodo) => ({
  id: fakeTodo.getId(),
  title: fakeTodo.getTitle(),
  description: fakeTodo.getDescription(),
  startDate: fakeTodo.getStartDate(),
  finishDate: fakeTodo.getFinishDate(),
  status: fakeTodo.getStatus(),
}));

class FakeTodoService implements GetAllService<TodoType> {
  perform(request: HttpRequest): Promise<TodoType[]> {
    return new Promise((resolve) => resolve(fakeTodoServiceResponse));
  }
}

let getAllTodoController: GetAllTodoController;
let fakeTodoService: FakeTodoService;
beforeEach(() => {
  fakeTodoService = new FakeTodoService();
  getAllTodoController = new GetAllTodoController(fakeTodoService);
});

describe("GetAllTodoController", () => {
  it("Should return status 200 on success", async () => {
    const response = await getAllTodoController.handle({});

    assertEquals(response.statusCode, 200);
    assertEquals(response.body, fakeTodoServiceResponse);
  });

  it("Should return status 404 if no Todo is found", async () => {
    stub(
      fakeTodoService,
      "perform",
      returnsNext([new Promise((resolve) => resolve([]))]),
    );
    const response = await getAllTodoController.handle({});

    assertEquals(response.statusCode, 404);
    assertExists(response.body.message);
    assertEquals(response.body.message, "No Todo was found.");
  });

  it("Should return status 500 if no GetAllTodoService throws", async () => {
    stub(
      fakeTodoService,
      "perform",
      returnsNext([new Promise((resolve, reject) => reject(null))]),
    );
    const response = await getAllTodoController.handle({});

    assertEquals(response.statusCode, 500);
    assertExists(response.body.message);
    assertEquals(response.body.message, "Error to get Todos.");
  });
});
