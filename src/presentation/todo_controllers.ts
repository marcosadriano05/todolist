import { Todo } from "../domain/todo/todo.ts";
import { Controller, HttpRequest, HttpResponse } from "./controller.ts";

export class CreateTodoController implements Controller {
  handle(request: HttpRequest): HttpResponse {
    const todo = new Todo(request.body.title);
    todo.setDescription(request.body.description);
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
  }
}
