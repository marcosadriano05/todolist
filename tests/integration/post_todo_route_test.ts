import { fail, superdeno } from "/deps/tests.ts";
import { client } from "/src/main/database.ts";

import { app } from "/src/main/app.ts";

async function create_todo() {
  await client.connect();

  await superdeno(app)
    .post("/todo")
    .set("Content-Type", "application/json")
    .send({
      title: "Any title",
      description: "Any description",
    })
    .expect((response) => {
      if (response.status !== 201) {
        fail("Status should be 201.");
      }
      if (!response.header.location) {
        fail("Should have a location header.");
      }
      if (!response.body) {
        fail("Should have a body response.");
      }
      if (!response.body.id) {
        fail("Body should has property id.");
      }
    });

  await client.end();
}

Deno.test({
  name: "Integration: Route POST /todo should returns status 201",
  fn: create_todo,
});

async function create_todo_without_title() {
  await client.connect();

  await superdeno(app)
    .post("/todo")
    .set("Content-Type", "application/json")
    .send({
      description: "Any description",
    })
    .expect((response) => {
      if (response.status !== 400) {
        fail("Status should be 400.");
      }
    });

  await client.end();
}

Deno.test({
  name:
    "Integration: Route POST /todo should returns status 400 if no title is provided",
  fn: create_todo_without_title,
});
