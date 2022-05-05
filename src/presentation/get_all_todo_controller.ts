import { Controller, HttpRequest, HttpResponse } from "./controller.ts";
import { GetAllTodoService } from "/src/services/todo_service.ts";

export class GetAllTodoController implements Controller {
  constructor(
    private readonly todoService: GetAllTodoService,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const todos = await this.todoService.perform(request);
    return { statusCode: 200, body: todos };
  }
}
