import { Router } from "../../external/opine.ts";
import { opineAdapter } from "./opine_adapter.ts";
import { createTodoController } from "./todo_factory.ts";

const router = Router();

router.get("/health-check", (_req, res) => res.send("Health Check!"));
router.post("/todo", opineAdapter(createTodoController()));

export { router };
