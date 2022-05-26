import { json, opine } from "/external/opine.ts";
import { router } from "./routes.ts";
import { connect } from "./database.ts";

const app = opine();

connect();

app.use(json());
app.use(router);

export { app };
