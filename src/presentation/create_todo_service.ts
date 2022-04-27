import { Todo } from "../domain/todo/todo.ts";
import { HttpRequest } from "./controller.ts";
import { TodoService } from "./todo_service.ts";
import { Repository } from "../infra/repository.ts";

export class CreateTodoService implements TodoService {
  constructor(private readonly todoRepository: Repository<Todo>) {}

  async perform(request: HttpRequest): Promise<Todo> {
    const { title, description, startDate, finishDate } = request.body;
    const todo = new Todo(title);
    todo.setDescription(description);
    todo.setStartDate(startDate);
    todo.setFinishDate(finishDate);
    const savedTodo = await this.todoRepository.save(todo);
    return new Promise((resolve) => resolve(savedTodo));
  }
}
