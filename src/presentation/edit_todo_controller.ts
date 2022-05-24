import { Controller, HttpRequest, HttpResponse } from "./controller.ts";
import { GetOneService } from "/src/services/todo_service.ts";
import { Todo } from "/src/domain/todo/todo.ts";
import { badRequest } from "./helpers.ts";

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
