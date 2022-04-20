import { Todo } from "../domain/todo/todo.ts";
import { Controller, HttpRequest } from "../presentation/controller.ts";
import { CreateTodoController } from "../presentation/todo_controllers.ts";
import { TodoService } from "../presentation/todo_service.ts";

class CreateTodoService implements TodoService {
  perform(request: HttpRequest): Promise<Todo> {
    const todo = new Todo(request.body.title);
    todo.setDescription(request.body.description);
    todo.setStartDate(request.body.startDate);
    return new Promise((resolve) => resolve(todo));
  }
}

export function createTodoController(): Controller {
  return new CreateTodoController(new CreateTodoService());
}
