import { Todo, TodoType } from "/src/domain/todo/todo.ts";
import { HttpRequest } from "/src/presentation/controller.ts";
import { GetOneService } from "./todo_service.ts";
import { Repository } from "/src/infra/repository.ts";

export class GetTodoService implements GetOneService<TodoType> {
  constructor(
    private readonly todoRepository: Repository<Todo, TodoType>,
  ) {}

  async perform(request: HttpRequest): Promise<TodoType> {
    const todo = await this.todoRepository.findById(request.params.id);
    return todo;
  }
}
