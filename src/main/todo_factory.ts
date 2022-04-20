import { Controller } from "../presentation/controller.ts";
import { CreateTodoController } from "../presentation/todo_controllers.ts";
import { CreateTodoService } from "../presentation/create_todo_service.ts";

export function createTodoController(): Controller {
  return new CreateTodoController(new CreateTodoService());
}
