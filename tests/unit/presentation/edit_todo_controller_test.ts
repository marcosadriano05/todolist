import {
  assertEquals,
  assertExists,
  assertSpyCalls,
  beforeEach,
  describe,
  it,
  spy,
} from "/external/tests.ts";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "/src/presentation/controller.ts";
import { GetOneService } from "/src/services/todo_service.ts";
import { Todo } from "/src/domain/todo/todo.ts";
import { badRequest } from "/src/presentation/helpers.ts";

const fakeId = crypto.randomUUID();

class FakeEditTodoService implements GetOneService<Todo> {
  perform(request: HttpRequest): Promise<Todo> {
    const todo = new Todo("Any Todo", fakeId);
    return new Promise((resolve) => resolve(todo));
  }
}

export class EditTodoController implements Controller {
  constructor(
    private readonly editTodoService: GetOneService<Todo>,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    if (!request.params?.id) {
      return badRequest("The route must have an id.");
    }
    if (!request.body) {
      return { statusCode: 100 };
    }
    await this.editTodoService.perform(request);
    return { statusCode: 100 };
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
});
