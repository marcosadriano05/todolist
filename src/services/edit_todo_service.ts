import { Todo } from "/src/domain/todo/todo.ts";
import { GetOneService } from "./todo_service.ts";
import { HttpRequest } from "/src/presentation/controller.ts";
import { Repository } from "/src/infra/repository.ts";

export class EditTodoService implements GetOneService<Todo> {
  constructor(
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async perform(request: HttpRequest): Promise<Todo> {
    const todo = await this.todoRepository.findById(request.params.id);
    if (!todo) {
      throw new Error("Todo not exists.");
    }
    const { title, description, startDate, finishDate } = request.body;

    title && todo.setTitle(title);
    description && todo.setDescription(description);
    startDate && todo.setStartDate(startDate);
    finishDate && todo.setFinishDate(finishDate);

    const editedTodo = await this.todoRepository.edit(todo);
    return editedTodo;
  }
}
