import { fail, superdeno } from "/external/tests.ts";
import { client } from "/src/main/database.ts";

import { app } from "/src/main/app.ts";

async function edit_todo() {
  await client.connect();
  let todoId = "";

  await superdeno(app)
    .post("/todo")
    .set("Content-Type", "application/json")
    .send({
      title: "Any title",
      description: "Any description",
    })
    .expect((response) => {
      todoId = response.body.todoId;
    });

  await superdeno(app)
    .patch(`/todo/${todoId}`)
    .set("Content-Type", "application/json")
    .send({
      title: "Edited title",
      description: "Edited description",
    })
    .expect((response) => {
      if (response.status !== 200) {
        fail("Status should be 200.");
      }
      if (!response.body) {
        fail("Should have a body response.");
      }
      if (response.body.id !== todoId) {
        fail("Todo id should be the same.");
      }
      if (response.body.title !== "Edited title") {
        fail("Todo title should be 'Edited title'.");
      }
      if (response.body.description !== "Edited description") {
        fail("Todo id should be 'Edited description'.");
      }
    });

  await client.end();
}

Deno.test({
  name: "Integration: Route PATCH /todo/:id should returns status 200",
  fn: edit_todo,
});

async function edit_todo_without_title() {
  await client.connect();

  let todoId = "";
  await superdeno(app)
    .post("/todo")
    .set("Content-Type", "application/json")
    .send({
      title: "Any title",
      description: "Any description",
    })
    .expect((response) => {
      todoId = response.body.todoId;
    });

  await superdeno(app)
    .patch(`/todo/${todoId}`)
    .set("Content-Type", "application/json")
    .send({
      description: "Edited description",
    })
    .expect((response) => {
      if (response.status !== 200) {
        fail("Status should be 200.");
      }
      if (!response.body) {
        fail("Should have a body response.");
      }
      if (response.body.id !== todoId) {
        fail("Todo id should be the same.");
      }
      if (response.body.title !== "Any title") {
        fail("Todo title should be 'Any title'.");
      }
      if (response.body.description !== "Edited description") {
        fail("Todo id should be 'Edited description'.");
      }
    });

  await client.end();
}

Deno.test({
  name: "Integration: Route POST /todo should edit only description",
  fn: edit_todo_without_title,
});

async function edit_todo_with_no_body() {
  await client.connect();
  const error_message = "The body should have one or more params.";

  await superdeno(app)
    .patch("/todo/any_id")
    .set("Content-Type", "application/json")
    .send({})
    .expect((response) => {
      if (response.status !== 400) {
        fail("Status should be 400.");
      }
      if (!response.body) {
        fail("Should have a body response.");
      }
      if (response.body.message !== error_message) {
        fail(`Should have a message with the value '${error_message}'.`);
      }
    });

  await client.end();
}

Deno.test({
  name:
    "Integration: Route PATCH /todo/:id should returns status 400 if no body is provided",
  fn: edit_todo_with_no_body,
});
