import { Todo } from "../domain/todo/todo.ts";
import { HttpRequest } from "../presentation/controller.ts";
import { TodoService } from "./todo_service.ts";
import { Repository } from "../infra/repository.ts";

export class GetTodoService implements TodoService {
  constructor(
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async perform(request: HttpRequest): Promise<Todo> {
    const todo = await this.todoRepository.findById(request.params.id);
    return todo;
  }
}
