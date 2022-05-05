import { Todo } from "/src/domain/todo/todo.ts";
import { HttpRequest } from "/src/presentation/controller.ts";
import { assertEquals, beforeEach, describe, it } from "/external/tests.ts";
import { GetAllTodoController } from "/src/presentation/get_all_todo_controller.ts";
import { GetAllTodoService } from "/src/services/todo_service.ts";

const fakeTodoServiceResponse: Todo[] = [
  new Todo("Todo 1"),
  new Todo("Todo 2"),
];

class FakeTodoService implements GetAllTodoService {
  perform(request: HttpRequest): Promise<Todo[]> {
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
});
