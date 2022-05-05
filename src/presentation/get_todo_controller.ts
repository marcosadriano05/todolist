import { Controller, HttpRequest, HttpResponse } from "./controller.ts";
import { GetOneTodoService } from "/src/services/todo_service.ts";

export class GetTodoController implements Controller {
  constructor(
    private readonly todoService: GetOneTodoService,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.params?.id) {
        return { statusCode: 400, body: { message: "Todo id is missing." } };
      }
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
