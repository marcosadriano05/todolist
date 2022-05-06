import { Todo } from "/src/domain/todo/todo.ts";
import { Controller, HttpRequest, HttpResponse } from "./controller.ts";
import { GetAllService } from "/src/services/todo_service.ts";

export class GetAllTodoController implements Controller {
  constructor(
    private readonly todoService: GetAllService<Todo>,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const todos = await this.todoService.perform(request);
      if (todos?.length === 0) {
        return { statusCode: 404, body: { message: "No Todo was found." } };
      }
      return { statusCode: 200, body: todos };
    } catch (_error) {
      return { statusCode: 500, body: { message: "Error to get Todos." } };
    }
  }
}
