import { Todo } from "/src/domain/todo/todo.ts";
import { Controller, HttpRequest, HttpResponse } from "./controller.ts";
import { GetOneService } from "/src/services/todo_service.ts";
import { badRequest, created, serverError } from "./helpers.ts";

export class CreateTodoController implements Controller {
  constructor(
    private readonly createTodoService: GetOneService<Todo>,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.title) {
        return badRequest("Title property is necessary.");
      }
      const todo = await this.createTodoService.perform(request);
      const body = {
        todoId: todo.getId(),
      };
      const headers = [
        {
          name: "Location",
          value: `http://localhost:5000/todo/${todo.getId()}`,
        },
      ];
      return created(body, headers);
    } catch (error) {
      return serverError(error.message);
    }
  }
}
