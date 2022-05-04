import {
  assertEquals,
  assertExists,
  beforeEach,
  describe,
  it,
} from "../../external/tests.ts";
import { HttpRequest } from "./controller.ts";
import { TodoService } from "../services/todo_service.ts";
import { Todo } from "../domain/todo/todo.ts";
import { GetTodoController } from "./get_todo_controller.ts";

const id = crypto.randomUUID();
const fakeTodo = new Todo("Fake todo", id);

class FakeTodoService implements TodoService {
  perform(request: HttpRequest): Promise<Todo> {
    return new Promise((resolve) => resolve(fakeTodo));
  }
}

let getTodoController: GetTodoController;
beforeEach(() => {
  const fakeTodoService = new FakeTodoService();
  getTodoController = new GetTodoController(fakeTodoService);
});

describe("GetTodoController", () => {
  it("should return status 200 on success", async () => {
    const response = await getTodoController.handle({
      params: { id },
    });

    assertEquals(response.statusCode, 200);
    assertEquals(response.body, fakeTodo);
    assertEquals(response.body.id, id);
  });

  it("should return status 500 if Todo has a diferent id", async () => {
    const response = await getTodoController.handle({
      params: { id: "any_id" },
    });

    assertEquals(response.statusCode, 500);
    assertExists(response.body.message);
    assertEquals(response.body.message, "Todo not found.");
  });
});