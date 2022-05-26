import { ClientPostgreSQL, NessieConfig } from "./deps.ts";

const client = new ClientPostgreSQL({
  database: "todolist",
  hostname: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
});

const config: NessieConfig = {
  client,
  migrationFolders: ["./db/migrations"],
  seedFolders: ["./db/seeds"],
};

export default config;
