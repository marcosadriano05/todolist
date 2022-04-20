import { Todo } from "../domain/todo/todo.ts";
import { Controller, HttpRequest, HttpResponse } from "./controller.ts";

export class CreateTodoController implements Controller {
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
      const todo = new Todo(request.body.title);
      todo.setDescription(request.body.description);
      todo.setStartDate(request.body.startDate);
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
