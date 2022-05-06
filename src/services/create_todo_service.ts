import { Todo } from "/src/domain/todo/todo.ts";
import { HttpRequest } from "/src/presentation/controller.ts";
import { GetOneService } from "./todo_service.ts";
import { Repository } from "/src/infra/repository.ts";

export class CreateTodoService implements GetOneService<Todo> {
  constructor(private readonly todoRepository: Repository<Todo>) {}

  async perform(request: HttpRequest): Promise<Todo> {
    const { title, description, startDate, finishDate } = request.body;
    const todo = new Todo(title);
    todo.setDescription(description);
    todo.setStartDate(startDate);
    todo.setFinishDate(finishDate);
    const savedTodo = await this.todoRepository.save(todo);
    return savedTodo;
  }
}
