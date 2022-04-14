import { Application, Router } from "../../external/oak.ts";
import { Todo } from "../domain/todo/todo.ts";

const app = new Application();
const router = new Router();

router
  .get("/health-check", (context) => {
    context.response.status = 200;
  })
  .post("/todo", async (context) => {
    const requestJson = context.request.body({ type: "json" });
    const data: { title: string; description: string } = await requestJson
      .value;
    const todo = new Todo(data.title);
    todo.setDescription(data.description);
    context.response.status = 201;
    context.response.headers.set(
      "Location",
      `http://localhost:5000/todo/${todo.getId()}`,
    );
    context.response.body = {
      todoId: todo.getId(),
    };
  });

app.use(router.routes());
app.use(router.allowedMethods());

export { app };
