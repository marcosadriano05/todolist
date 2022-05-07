import { Todo } from "/src/domain/todo/todo.ts";
import { Controller, HttpRequest, HttpResponse } from "./controller.ts";
import { GetAllService } from "/src/services/todo_service.ts";
import { notFound, ok, serverError } from "./helpers.ts";

export class GetAllTodoController implements Controller {
  constructor(
    private readonly todoService: GetAllService<Todo>,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const todos = await this.todoService.perform(request);
      if (todos?.length === 0) {
        return notFound("No Todo was found.");
      }
      return ok(todos);
    } catch (_error) {
      return serverError("Error to get Todos.");
    }
  }
}
