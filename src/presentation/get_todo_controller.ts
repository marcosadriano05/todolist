import { Controller, HttpRequest, HttpResponse } from "./controller.ts";
import { TodoService } from "../services/todo_service.ts";

export class GetTodoController implements Controller {
  constructor(
    private readonly todoService: TodoService,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const todo = await this.todoService.perform(request.params.id);
    return { statusCode: 200, body: todo };
  }
}
