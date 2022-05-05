import { Todo } from "/src/domain/todo/todo.ts";
import { HttpRequest } from "/src/presentation/controller.ts";
import { TodoService } from "./todo_service.ts";
import { Repository } from "/src/infra/repository.ts";

export class GetTodoService implements TodoService {
  constructor(
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async perform(request: HttpRequest): Promise<Todo> {
    const todo = await this.todoRepository.findById(request.params.id);
    return todo;
  }
}
