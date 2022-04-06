import { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";

const app = new Application();
const router = new Router();

router
  .get("/health-check", (context) => {
    context.response.status = 200;
  });

app.use(router.routes());
app.use(router.allowedMethods());

export { app };
