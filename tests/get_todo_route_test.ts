import { fail, superdeno } from "../external/tests.ts";
import { app } from "../src/main/app.ts";

async function get_todo_with_id_route_param() {
  // deno-lint-ignore no-explicit-any
  let responseBody: any;
  await superdeno(app)
    .post("/todo")
    .set("Content-Type", "application/json")
    .send({
      title: "Any title",
      description: "Any description",
    })
    .expect((response) => {
      if (response.status === 201) {
        responseBody = response.body;
      }
      if (response.status !== 201) {
        fail("Status should be 201.");
      }
    });

  await superdeno(app)
    .get(`/todo/${responseBody.todoId}`)
    .set("Content-Type", "application/json")
    .expect((response) => {
      if (!response.body) {
        fail("Should have a body response.");
      }
      if (!response.body.id) {
        fail("Body should has property id.");
      }
      if (response.body.id !== responseBody.todoId) {
        fail("Todo id should be equal to route param id.");
      }
    });
}

Deno.test({
  name:
    "Integration: Route GET /todo/:id should returns status 200 if todo is returned",
  ignore: Deno.env.get("INTEGRATION_TEST_ENEABLED")?.match("true")
    ? false
    : true,
  fn: get_todo_with_id_route_param,
});

async function get_todo_returns_status_500() {
  const message = "Todo not found.";
  await superdeno(app)
    .get("/todo/wrong-id")
    .set("Content-Type", "application/json")
    .expect((response) => {
      if (response.status !== 500) {
        fail("Status should be 500.");
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
}

Deno.test({
  name:
    "Integration: Route GET /todo/:id should returns status 500 if no todo is founded",
  ignore: Deno.env.get("INTEGRATION_TEST_ENEABLED")?.match("true")
    ? false
    : true,
  fn: get_todo_returns_status_500,
});
