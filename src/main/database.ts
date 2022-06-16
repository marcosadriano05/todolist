import { postgres } from "/external/postgresql.ts";

export const client = new postgres.Client({
  user: "postgres",
  password: "postgres",
  database: "todolist",
  hostname: "localhost",
  port: 5432,
});

export const connect = async () => {
  await client.connect();
};
