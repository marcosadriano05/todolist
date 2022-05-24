import { assertEquals, assertExists, describe, it } from "/external/tests.ts";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "/src/presentation/controller.ts";
import { badRequest } from "/src/presentation/helpers.ts";

export class EditTodoController implements Controller {
  handle(request: HttpRequest): Promise<HttpResponse> {
    if (!request.params?.id) {
      return new Promise((resolve) =>
        resolve(badRequest("The route must have an id."))
      );
    }
    return new Promise((resolve) => resolve({ statusCode: 100 }));
  }
}

describe("EditTodoController", () => {
  it("should return status 400 if no id param is passed", async () => {
    const editTodoController = new EditTodoController();
    const response = await editTodoController.handle({});

    assertEquals(response.statusCode, 400);
    assertExists(response.body["message"]);
    assertEquals(response.body.message, "The route must have an id.");
  });
});
