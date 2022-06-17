import { Controller, HttpRequest, HttpResponse } from "./controller.ts";
import { GetOneService } from "/src/services/todo_service.ts";
import { TodoType } from "/src/domain/todo/todo.ts";
import { badRequest, ok, serverError } from "./helpers.ts";

export class EditTodoController implements Controller {
  constructor(
    private readonly editTodoService: GetOneService<TodoType>,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.params?.id) {
        return badRequest("The route must have an id.");
      }
      if (!request.body || Object.keys(request.body).length === 0) {
        return badRequest("The body should have one or more params.");
      }
      const editedTodo = await this.editTodoService.perform(request);
      return ok(editedTodo);
    } catch (error) {
      return serverError("Error to edit Todo.");
    }
  }
}
