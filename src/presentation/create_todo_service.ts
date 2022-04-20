import { Todo } from "../domain/todo/todo.ts";
import { HttpRequest } from "./controller.ts";
import { TodoService } from "./todo_service.ts";

export class CreateTodoService implements TodoService {
  perform(request: HttpRequest): Promise<Todo> {
    const todo = new Todo(request.body.title);
    todo.setDescription(request.body.description);
    todo.setStartDate(request.body.startDate);
    return new Promise((resolve) => resolve(todo));
  }
}
