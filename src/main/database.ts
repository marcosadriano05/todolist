import { Client } from "/external/postgresql.ts";

export const client = new Client({
  user: "postgres",
  password: "postgres",
  database: "todolist",
  hostname: "localhost",
  port: 5432,
});

export const connect = async () => {
  await client.connect();
};
