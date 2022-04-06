# Todolist app

This app is a simple Todolist where the user manage your tasks. It was made with
Deno runtime applying TDD concepts and Github Actions workflows to learning
purposes.

### How to run

Its needed Deno runtime installed.

To run the unit tests, run the command:

```ts
deno run --allow-net --allow-env
```

To run the integration tests too, its needed to create an env variable:

```shell
export INTEGRATION_TEST_ENEABLED=true
```

And run the command:

```ts
deno run --allow-net --allow-env
```
