import { Todo } from "../domain/todo/todo.ts";
import { HttpRequest } from "./controller.ts";

export interface TodoService {
  perform(request: HttpRequest): Promise<Todo>;
}
