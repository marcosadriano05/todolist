import { Todo } from "../domain/todo/todo.ts";
import { HttpRequest } from "./controller.ts";
import { TodoService } from "./todo_service.ts";
import { formatToDatetime } from "../utils/date_format.ts";

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
    todo.setFinishDate(finishDate);
    const formatedStartDate = todo.getStartDate() instanceof Date
      ? formatToDatetime(todo.getStartDate())
      : null;
    const formatedFinishDate = todo.getFinishDate() instanceof Date
      ? formatToDatetime(todo.getFinishDate())
      : null;
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
      '${formatedStartDate}',
      '${formatedFinishDate}',
      '${todo.getStatus()}'
    );`);
    const todoFromDB = this.database.query(
      `SELECT * FROM todo WHERE id = '${todo.getId()}'`,
    );
    if (todoFromDB.length > 1) {
      throw new Error("Should have one todo.");
    }
    return new Promise((resolve) => resolve(todo));
  }
}
