import { HttpRequest } from "/src/presentation/controller.ts";

export interface GetOneService<T> {
  perform(request: HttpRequest): Promise<T>;
}

export interface GetAllService<T> {
  perform(request: HttpRequest): Promise<T[]>;
}
