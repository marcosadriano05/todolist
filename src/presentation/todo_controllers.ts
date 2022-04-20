import { Todo } from "../domain/todo/todo.ts";
import { Controller, HttpRequest, HttpResponse } from "./controller.ts";

export class CreateTodoController implements Controller {
  handle(request: HttpRequest): Promise<HttpResponse> {
    if (!request.body.title) {
      return new Promise((resolve) => resolve({ statusCode: 400 }));
    }
    const todo = new Todo(request.body.title);
    todo.setDescription(request.body.description);
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
  }
}
