# Todolist app

This app is a simple Todolist where the user manage your tasks. It was made with
Deno runtime applying TDD concepts and Github Actions workflows to learning
purposes.

### How to run

Its needed Deno runtime installed.

To run the unit tests, run the command:

```shell
deno run --allow-net --allow-env
```

To run the integration tests too, its needed to create an env variable:

```shell
export INTEGRATION_TEST_ENEABLED=true
```

And run the command:

```shell
deno run --allow-net --allow-env
```

### Develop

On scripts folder, the command script has some instructions as alias to long
line of deno commands.

To give execute permission:

```shell
chmod +x ./scripts/commands.sh
```

To run only unit tests:

```shell
./scripts/commands.sh test
```

To run integration tests too:

```shell
./scripts/commands.sh test integration
```
