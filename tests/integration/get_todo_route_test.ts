import { fail, superdeno } from "/external/tests.ts";
import { app } from "/src/main/app.ts";
import { client } from "/src/main/database.ts";

async function get_todo_with_id_route_param() {
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
      if (response.status !== 201) {
        fail("Status should be 201.");
      }
      todoId = response.body.id;
    });

  await superdeno(app)
    .get(`/todo/${todoId}`)
    .set("Content-Type", "application/json")
    .expect((response) => {
      if (!response.body) {
        fail("Should have a body response.");
      }
      if (!response.body.id) {
        fail("Body should has property id.");
      }
      if (response.body.id !== todoId) {
        fail("Todo id should be equal to route param id.");
      }
    });

  await client.end();
}

Deno.test({
  name:
    "Integration: Route GET /todo/:id should returns status 200 if todo is returned",
  fn: get_todo_with_id_route_param,
});

async function get_todo_returns_status_400() {
  await client.connect();

  const message = "Id should be UUID.";
  await superdeno(app)
    .get("/todo/wrong-id")
    .set("Content-Type", "application/json")
    .expect((response) => {
      if (response.status !== 400) {
        fail("Status should be 400.");
      }
      if (!response.body) {
        fail("Should have a body response.");
      }
      if (!response.body.message) {
        fail("Body should has property message.");
      }
      if (response.body.message !== message) {
        fail("Wrong message returned.");
      }
    });

  await client.end();
}

Deno.test({
  name:
    "Integration: Route GET /todo/:id should returns status 404 if no todo is founded",
  fn: get_todo_returns_status_400,
});
