import { Repository } from "./repository.ts";
import { Todo } from "../domain/todo/todo.ts";
import { DB } from "../../external/sqlite.ts";
import { formatToDatetime } from "../utils/date_format.ts";

export class SqliteTodoRepository implements Repository<Todo> {
  constructor(private readonly database: DB) {}

  save(data: Todo): Promise<Todo> {
    const formatedStartDate = data.getStartDate() instanceof Date
      ? formatToDatetime(data.getStartDate())
      : null;
    const formatedFinishDate = data.getFinishDate() instanceof Date
      ? formatToDatetime(data.getFinishDate())
      : null;
    this.database.query(`INSERT INTO todo (
      id,
      title,
      description,
      start_date,
      finish_date,
      status
    ) VALUES (
      '${data.getId()}',
      '${data.getTitle()}',
      '${data.getDescription()}',
      '${formatedStartDate}',
      '${formatedFinishDate}',
      '${data.getStatus()}'
    );`);

    const todoFromDB = this.database.query(
      `SELECT * FROM todo WHERE id = '${data.getId()}'`,
    );
    if (todoFromDB.length > 1) {
      throw new Error("Should have one todo.");
    }

    return new Promise((resolve) =>
      resolve(fromDatabaseToTodo(todoFromDB as string[][]))
    );
  }
}

function fromDatabaseToTodo(data: string[][]): Todo {
  if (data.length === 1) {
    const todo = new Todo(data[0][1], data[0][0]);
    todo.setDescription(data[0][2]);
    todo.setStartDate(data[0][3]);
    todo.setFinishDate(data[0][4]);
    return todo;
  }
  return new Todo("Error");
}
