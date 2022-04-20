import { Todo } from "../domain/todo/todo.ts";
import { HttpRequest } from "./controller.ts";
import { TodoService } from "./todo_service.ts";

import { DB } from "../../external/sqlite.ts";

export class CreateTodoService implements TodoService {
  private database: DB;

  constructor() {
    this.database = new DB("sqlite.db");
  }

  perform(request: HttpRequest): Promise<Todo> {
    const { title, description, startDate, finishDate } = request.body;
    const todo = new Todo(title);
    todo.setDescription(description);
    todo.setStartDate(startDate);
    todo.setStartDate(finishDate);
    this.database.query(`INSERT INTO todo (
      id,
      title,
      description,
      start_date,
      finish_date,
      status
    ) VALUES (
      '${todo.getId()}',
      '${todo.getTitle()}',
      '${todo.getDescription()}',
      '${todo.getStartDate()}',
      '${todo.getFinishDate()}',
      '${todo.getStatus()}'
    );`);
    return new Promise((resolve) => resolve(todo));
  }
}
