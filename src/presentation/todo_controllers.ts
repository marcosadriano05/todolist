import { Controller, HttpRequest, HttpResponse } from "./controller.ts";
import { TodoService } from "./todo_service.ts";

export class CreateTodoController implements Controller {
  constructor(
    private readonly createTodoService: TodoService,
  ) {}

  handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.title) {
        return new Promise((resolve) =>
          resolve({
            statusCode: 400,
            body: { message: "Title property is necessary." },
          })
        );
      }
      const todo = this.createTodoService.perform(request);
      return new Promise((resolve) =>
        resolve({
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
        })
      );
    } catch (error) {
      return new Promise((resolve) =>
        resolve({
          statusCode: 500,
          body: { message: error.message },
        })
      );
    }
  }
}
