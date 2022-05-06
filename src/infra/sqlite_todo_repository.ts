import { Repository } from "./repository.ts";
import { Todo } from "/src/domain/todo/todo.ts";
import { DB } from "/external/sqlite.ts";
import { formatToDatetime } from "/src/utils/date_format.ts";

export class SqliteTodoRepository implements Repository<Todo> {
  constructor(private readonly database: DB) {}

  findAll(): Promise<Todo[]> {
    const todosFromDB = this.database.query(
      "SELECT * FROM todo",
    );
    return new Promise((resolve) =>
      resolve(fromDatabaseToTodoArray(todosFromDB as string[][]))
    );
  }

  findById(id: string | number): Promise<Todo> {
    const todoFromDB = this.database.query(
      `SELECT * FROM todo WHERE id = ?`,
      [id],
    );
    if (todoFromDB.length > 1) {
      throw new Error("Should have one todo.");
    }
    return new Promise((resolve) =>
      resolve(fromDatabaseToTodo(todoFromDB as string[][]))
    );
  }

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
      finish_date
    ) VALUES (
      '${data.getId()}',
      '${data.getTitle()}',
      '${data.getDescription()}',
      '${formatedStartDate}',
      '${formatedFinishDate}'
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

function fromDatabaseToTodoArray(data: string[][]): Todo[] {
  if (data.length < 2) {
    throw new Error("Error to convert data from database to todo array.");
  }
  const todos = data.map((value) => {
    const todo = new Todo(value[1], value[0]);
    todo.setDescription(value[2]);
    todo.setStartDate(value[3]);
    todo.setFinishDate(value[4]);
    return todo;
  });
  return todos;
}
