import { json, opine } from "../../external/opine.ts";
import { router } from "./routes.ts";

const app = opine();

app.use(json());
app.use(router);

export { app };
