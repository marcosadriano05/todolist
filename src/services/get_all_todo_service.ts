import { Todo } from "/src/domain/todo/todo.ts";
import { GetAllService } from "./todo_service.ts";
import { Repository } from "/src/infra/repository.ts";
import { HttpRequest } from "../presentation/controller.ts";

export class GetAllTodoService implements GetAllService<Todo> {
  constructor(
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async perform(request: HttpRequest): Promise<Todo[]> {
    const todos = await this.todoRepository.findAll();
    return todos;
  }
}
