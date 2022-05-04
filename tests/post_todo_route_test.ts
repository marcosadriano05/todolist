import { fail, superdeno } from "../external/tests.ts";

import { app } from "../src/main/app.ts";

async function create_todo() {
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
      if (!response.body.todoId) {
        fail("Body should has property todoId.");
      }
    });
}

Deno.test({
  name: "Integration: Route POST /todo should returns status 201",
  ignore: Deno.env.get("INTEGRATION_TEST_ENEABLED")?.match("true")
    ? false
    : true,
  fn: create_todo,
});

async function create_todo_without_title() {
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
}

Deno.test({
  name:
    "Integration: Route POST /todo should returns status 400 if no title is provided",
  ignore: Deno.env.get("INTEGRATION_TEST_ENEABLED")?.match("true")
    ? false
    : true,
  fn: create_todo_without_title,
});
