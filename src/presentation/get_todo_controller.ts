import { Todo } from "/src/domain/todo/todo.ts";
import { Controller, HttpRequest, HttpResponse } from "./controller.ts";
import { GetOneService } from "/src/services/todo_service.ts";
import { badRequest, notFound, ok, serverError } from "./helpers.ts";

export class GetTodoController implements Controller {
  constructor(
    private readonly todoService: GetOneService<Todo>,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.params?.id) {
        return badRequest("Todo id is missing.");
      }
      const todo = await this.todoService.perform(request);
      if (todo.getId() !== request.params.id) {
        return serverError("Error to get Todo.");
      }
      return ok(todo);
    } catch (_error) {
      return notFound("Todo not found.");
    }
  }
}
