import { Controller } from "/src/presentation/controller.ts";
import { CreateTodoController } from "/src/presentation/create_todo_controller.ts";
import { GetTodoController } from "/src/presentation/get_todo_controller.ts";
import { GetAllTodoController } from "/src/presentation/get_all_todo_controller.ts";
import { CreateTodoService } from "/src/services/create_todo_service.ts";
import { GetTodoService } from "/src/services/get_todo_service.ts";
import { GetAllTodoService } from "/src/services/get_all_todo_service.ts";
import { EditTodoService } from "/src/services/edit_todo_service.ts";
import { EditTodoController } from "/src/presentation/edit_todo_controller.ts";
import { PostgresTodoRepository } from "/src/infra/postgres_todo_repository.ts";
import { client } from "/src/main/database.ts";

export function createTodoController(): Controller {
  const repo = new PostgresTodoRepository(client);
  const service = new CreateTodoService(repo);
  return new CreateTodoController(service);
}

export function getTodoController(): Controller {
  const repo = new PostgresTodoRepository(client);
  const service = new GetTodoService(repo);
  return new GetTodoController(service);
}

export function getAllTodoController(): Controller {
  const repo = new PostgresTodoRepository(client);
  const service = new GetAllTodoService(repo);
  return new GetAllTodoController(service);
}

export function editTodoController(): Controller {
  const repo = new PostgresTodoRepository(client);
  const service = new EditTodoService(repo);
  return new EditTodoController(service);
}
