import { Client } from "/deps/postgresql.ts";

export const client = new Client({
  user: "postgres",
  password: "postgres",
  database: "todolist",
  hostname: "localhost",
  port: 5435,
});

export const connect = async () => {
  await client.connect();
};
