import { Controller, HttpRequest, HttpResponse } from "./controller.ts";
import { TodoService } from "/src/services/todo_service.ts";

export class CreateTodoController implements Controller {
  constructor(
    private readonly createTodoService: TodoService,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.title) {
        return {
          statusCode: 400,
          body: { message: "Title property is necessary." },
        };
      }
      const todo = await this.createTodoService.perform(request);
      return {
        statusCode: 201,
        headers: [
          {
            name: "Location",
            value: `http://localhost:5000/todo/${todo.getId()}`,
          },
        ],
        body: {
          todoId: todo.getId(),
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { message: error.message },
      };
    }
  }
}
