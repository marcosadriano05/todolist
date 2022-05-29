# Todolist app

This app is a simple Todolist where the user manage your tasks. It was made with
Deno runtime applying TDD concepts and Github Actions workflows to learning
purposes.

### How to run

Its needed Deno runtime installed.

The database used is Postgresql 14 on port 5432.

You need to run all migrations to generate all tables. Run this command:

```shell
deno task migration:run
```

Run the command above to populate the database with default data:

```shell
deno task seed:run
```

To run the application:

```shell
deno task run
```

To run the unit tests, run the command:

```shell
deno task test
```

To run only unit tests:

```shell
deno task test:unit
```

To run integration tests too:

```shell
deno task test:integration
```
