import { Application } from "../../external/oak.ts";
import { router } from "./routes.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

export { app };
