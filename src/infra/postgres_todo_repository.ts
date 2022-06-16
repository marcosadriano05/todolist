import { Todo, TodoType } from "/src/domain/todo/todo.ts";
import { Repository } from "./repository.ts";
import { postgres } from "/external/postgresql.ts";
import { formatToDatetime } from "/src/utils/date_format.ts";

export class PostgresTodoRepository implements Repository<Todo, TodoType> {
  constructor(
    private readonly client: postgres.Client,
  ) {}

  async findById(id: string | number): Promise<TodoType> {
    const data = await this.client.queryObject<Todo>(
      "SELECT * FROM todo WHERE id = $1;",
      [id],
    );
    return transformInTodo(data);
  }

  async findAll(): Promise<TodoType[]> {
    const data = await this.client.queryObject<Todo>("SELECT * FROM todo;");
    return transformInTodoArray(data);
  }

  async save(data: Todo): Promise<TodoType> {
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

  async edit(data: Todo): Promise<TodoType> {
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

function transformInTodo(data: any): TodoType {
  const todoObj = data.rows[0];
  const todo: TodoType = {
    title: todoObj.title,
    id: todoObj.id,
    description: todoObj.description,
    startDate: todoObj.start_date,
    finishDate: todoObj.finish_date,
    status: todoObj.status,
  };
  return todo;
}

function transformInTodoArray(data: any): TodoType[] {
  return data.rows.map((todoObj: any) => {
    const todo: TodoType = {
      title: todoObj.title,
      id: todoObj.id,
      description: todoObj.description,
      startDate: todoObj.start_date,
      finishDate: todoObj.finish_date,
      status: todoObj.status,
    };
    return todo;
  });
}
