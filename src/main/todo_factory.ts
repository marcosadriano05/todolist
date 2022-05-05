import { Controller } from "/src/presentation/controller.ts";
import { CreateTodoController } from "/src/presentation/todo_controllers.ts";
import { GetTodoController } from "/src/presentation/get_todo_controller.ts";
import { CreateTodoService } from "/src/services/create_todo_service.ts";
import { GetTodoService } from "/src/services/get_todo_service.ts";
import { SqliteTodoRepository } from "/src/infra/sqlite_todo_repository.ts";
import { DB } from "/external/sqlite.ts";

export function createTodoController(): Controller {
  const database = new DB("sqlite.db");
  const repo = new SqliteTodoRepository(database);
  const service = new CreateTodoService(repo);
  return new CreateTodoController(service);
}

export function getTodoController(): Controller {
  const database = new DB("sqlite.db");
  const repo = new SqliteTodoRepository(database);
  const service = new GetTodoService(repo);
  return new GetTodoController(service);
}
