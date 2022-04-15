import { ClientSQLite, NessieConfig } from "./deps.ts";

const client = new ClientSQLite("./sqlite.db");

const config: NessieConfig = {
  client,
  migrationFolders: ["./db/migrations"],
  seedFolders: ["./db/seeds"],
};

export default config;
