import { Todo, TodoType } from "/src/domain/todo/todo.ts";
import { GetOneService } from "./todo_service.ts";
import { HttpRequest } from "/src/presentation/controller.ts";
import { Repository } from "/src/infra/repository.ts";

export class EditTodoService implements GetOneService<TodoType> {
  constructor(
    private readonly todoRepository: Repository<Todo, TodoType>,
  ) {}

  async perform(request: HttpRequest): Promise<TodoType> {
    const todoFinded = await this.todoRepository.findById(request.params.id);
    if (!todoFinded) {
      throw new Error("Todo not exists.");
    }
    const { title, description, startDate, finishDate } = request.body;
    const todo = new Todo(todoFinded.title, todoFinded.id);
    todo.setDescription(todoFinded.description);
    todoFinded.startDate && todo.setStartDate(todoFinded.startDate);
    todoFinded.finishDate && todo.setFinishDate(todoFinded.finishDate);

    title && todo.setTitle(title);
    description && todo.setDescription(description);
    startDate && todo.setStartDate(startDate);
    finishDate && todo.setFinishDate(finishDate);

    const editedTodo = await this.todoRepository.edit(todo);
    return editedTodo;
  }
}
