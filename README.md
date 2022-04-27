# Todolist app

This app is a simple Todolist where the user manage your tasks. It was made with
Deno runtime applying TDD concepts and Github Actions workflows to learning
purposes.

### How to run

Its needed Deno runtime installed.

First of all, you need to run all migrations to generate the Sqlite database
with all tables. Run this command:

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

or

```shell
deno run --unstable --allow-net ./src/main/server.ts
```

To run the unit tests, run the command:

```shell
deno test --unstable --allow-net --allow-env
```

To run the integration tests too, its needed to create an env variable:

```shell
export INTEGRATION_TEST_ENEABLED=true
```

And run the command:

```shell
deno test --unstable --allow-net --allow-env
```

To make easy run the commands, the Makefile contains some scripts:

To run only unit tests:

```shell
deno task test:unit
```

To run integration tests too:

```shell
deno task test:integration
```
