import { Todo, TodoType } from "/src/domain/todo/todo.ts";
import { GetAllService } from "./todo_service.ts";
import { Repository } from "/src/infra/repository.ts";
import { HttpRequest } from "../presentation/controller.ts";

export class GetAllTodoService implements GetAllService<TodoType> {
  constructor(
    private readonly todoRepository: Repository<Todo, TodoType>,
  ) {}

  async perform(request: HttpRequest): Promise<TodoType[]> {
    const todos = await this.todoRepository.findAll();
    return todos;
  }
}
