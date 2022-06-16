import { nessie } from "./deps.ts";

const client = new nessie.ClientPostgreSQL({
  database: "todolist",
  hostname: "localhost",
  port: 5435,
  user: "postgres",
  password: "postgres",
});

const config: nessie.NessieConfig = {
  client,
  migrationFolders: ["./db/migrations"],
  seedFolders: ["./db/seeds"],
};

export default config;
