import { Context, Router } from "../../external/oak.ts";
import { oakAdapter } from "./oak_adapter.ts";
import { createTodoController } from "./todo_factory.ts";

const router = new Router();

router
  .get("/health-check", (context: Context) => {
    context.response.status = 200;
  })
  .post("/todo", oakAdapter(createTodoController()));

export { router };
