import { Application, Router } from "../../external/oak.ts";

const app = new Application();
const router = new Router();

router
  .get("/health-check", (context) => {
    context.response.status = 200;
  });

app.use(router.routes());
app.use(router.allowedMethods());

export { app };
