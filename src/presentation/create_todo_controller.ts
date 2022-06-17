import { TodoType } from "/src/domain/todo/todo.ts";
import { Controller, HttpRequest, HttpResponse } from "./controller.ts";
import { GetOneService } from "/src/services/todo_service.ts";
import { badRequest, created, serverError } from "./helpers.ts";

export class CreateTodoController implements Controller {
  constructor(
    private readonly createTodoService: GetOneService<TodoType>,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.title) {
        return badRequest("Title property is necessary.");
      }
      const todo = await this.createTodoService.perform(request);
      const body = {
        id: todo.id,
      };
      const headers = [
        {
          name: "Location",
          value: `http://localhost:5000/todo/${todo.id}`,
        },
      ];
      return created(body, headers);
    } catch (error) {
      return serverError(error.message);
    }
  }
}
