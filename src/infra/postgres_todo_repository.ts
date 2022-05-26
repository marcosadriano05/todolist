import { Todo } from "/src/domain/todo/todo.ts";
import { Repository } from "./repository.ts";
import { Client } from "/external/postgresql.ts";
import { formatToDatetime } from "/src/utils/date_format.ts";

export class PostgresTodoRepository implements Repository<Todo> {
  constructor(
    private readonly client: Client,
  ) {}

  async findById(id: string | number): Promise<Todo> {
    const data = await this.client.queryObject<Todo>(
      "SELECT * FROM todo WHERE id = $1;",
      [id],
    );
    return transformInTodo(data);
  }

  async findAll(): Promise<Todo[]> {
    const data = await this.client.queryObject<Todo>("SELECT * FROM todo;");
    return transformInTodoArray(data);
  }

  async save(data: Todo): Promise<Todo> {
    const formatedStartDate = data.getStartDate() instanceof Date
      ? formatToDatetime(data.getStartDate())
      : null;
    const formatedFinishDate = data.getFinishDate() instanceof Date
      ? formatToDatetime(data.getFinishDate())
      : null;
    await this.client.queryObject(
      `INSERT INTO todo (
      id,
      title,
      description,
      start_date,
      finish_date
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5
    );`,
      [
        data.getId(),
        data.getTitle(),
        data.getDescription(),
        formatedStartDate,
        formatedFinishDate,
      ],
    );
    return await this.findById(data.getId());
  }

  async edit(data: Todo): Promise<Todo> {
    const formatedStartDate = data.getStartDate() instanceof Date
      ? formatToDatetime(data.getStartDate())
      : null;
    const formatedFinishDate = data.getFinishDate() instanceof Date
      ? formatToDatetime(data.getFinishDate())
      : null;
    await this.client.queryObject(
      `UPDATE todo SET 
        title = $1,
        description = $2,
        start_date = $3,
        finish_date = $4
      WHERE id = $5;`,
      [
        data.getTitle(),
        data.getDescription(),
        formatedStartDate,
        formatedFinishDate,
        data.getId(),
      ],
    );
    return await this.findById(data.getId());
  }
}

function transformInTodo(data: any): Todo {
  const todoObj = data.rows[0];
  const todo = new Todo(todoObj.title, todoObj.id);
  todo.setDescription(todoObj.description);
  todo.setStartDate(todoObj.start_date);
  todo.setFinishDate(todoObj.finish_date);
  return todo;
}

function transformInTodoArray(data: any): Todo[] {
  return data.rows.map((todoObj: any) => {
    const todo = new Todo(todoObj.title, todoObj.id);
    todo.setDescription(todoObj.description);
    todo.setStartDate(todoObj.start_date);
    todo.setFinishDate(todoObj.finish_date);
    return todo;
  });
}
