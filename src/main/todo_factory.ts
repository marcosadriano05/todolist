import { Controller } from "../presentation/controller.ts";
import { CreateTodoController } from "../presentation/todo_controllers.ts";
import { CreateTodoService } from "../services/create_todo_service.ts";
import { SqliteTodoRepository } from "../infra/sqlite_todo_repository.ts";
import { DB } from "../../external/sqlite.ts";

export function createTodoController(): Controller {
  const database = new DB("sqlite.db");
  const repo = new SqliteTodoRepository(database);
  const service = new CreateTodoService(repo);
  return new CreateTodoController(service);
}
