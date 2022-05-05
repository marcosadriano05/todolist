import { Todo } from "/src/domain/todo/todo.ts";
import { HttpRequest } from "/src/presentation/controller.ts";

export interface GetOneTodoService {
  perform(request: HttpRequest): Promise<Todo>;
}
