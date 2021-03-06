import { Router } from "/deps/opine.ts";
import { opineAdapter } from "./opine_adapter.ts";
import {
  createTodoController,
  editTodoController,
  getAllTodoController,
  getTodoController,
} from "./todo_factory.ts";

const router = Router();

router.get("/health-check", (_req, res) => res.send("Health Check!"));
router.post("/todo", opineAdapter(createTodoController()));
router.get("/todo/:id", opineAdapter(getTodoController()));
router.get("/todo", opineAdapter(getAllTodoController()));
router.patch("/todo/:id", opineAdapter(editTodoController()));

export { router };
