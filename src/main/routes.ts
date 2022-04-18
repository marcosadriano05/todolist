import { Context, Router } from "../../external/oak.ts";
import { oakAdapter } from "./oak_adapter.ts";
import { CreateTodoController } from "../presentation/todo_controllers.ts";

const router = new Router();

router
  .get("/health-check", (context: Context) => {
    context.response.status = 200;
  })
  .post("/todo", oakAdapter(new CreateTodoController()));

export { router };
