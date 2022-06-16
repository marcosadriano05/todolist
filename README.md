# Todolist app

This app is a simple Todolist where the user manage your tasks. It was made with
Deno runtime applying TDD concepts and Github Actions workflows to learning
purposes.

### How to run

Its needed Deno runtime installed.

The database used is Postgresql 14 on port 5435, but you can change in the
Nessie config file and Database setup file on main folder. This port 5435 is to
don't cause conflict with the possible Postgres port if its already installed.

In the scripts folder, theres a script called setup_dev.sh, if this script is
executed, is generated on container docker for Postgres 14 alpine on port 5435
and all migrations are executed too. This is to automatize the database setup.

To run this script, is needed Docker installed and run the command:

```shell
deno task setup:dev
```

If you do this manually, run the commands bellow to run migrations and prepare
the database:

You need to run all migrations to generate all tables. Run this command:

```shell
deno task migration:run
```

Run the command above to populate the database with default data:

```shell
deno task seed:run
```

After all setup are up:

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
