import { Controller, HttpRequest, HttpResponse } from "./controller.ts";
import { TodoService } from "../services/todo_service.ts";

export class GetTodoController implements Controller {
  constructor(
    private readonly todoService: TodoService,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const todo = await this.todoService.perform(request);
      if (todo.getId() !== request.params.id) {
        return { statusCode: 500, body: { message: "Error to get Todo." } };
      }
      return { statusCode: 200, body: todo };
    } catch (_error) {
      return { statusCode: 404, body: { message: "Todo not found." } };
    }
  }
}
