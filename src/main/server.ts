import { app } from "./app.ts";
import { connect } from "./database.ts";

connect();

app.listen(5000, () => console.log("Opine on port 5000"));
