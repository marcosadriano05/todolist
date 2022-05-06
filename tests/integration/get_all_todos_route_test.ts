import { fail, superdeno } from "/external/tests.ts";
import { app } from "/src/main/app.ts";

async function get_all_todos() {
  await superdeno(app)
    .post("/todo")
    .set("Content-Type", "application/json")
    .send({
      title: "Todo 1",
      description: "Description 1",
    })
    .expect((response) => {
      if (response.status !== 201) {
        fail("Error to save todo.");
      }
    });

  await superdeno(app)
    .post("/todo")
    .set("Content-Type", "application/json")
    .send({
      title: "Todo 2",
      description: "Description 2",
    })
    .expect((response) => {
      if (response.status !== 201) {
        fail("Error to save todo.");
      }
    });

  await superdeno(app)
    .get("/todo")
    .set("Content-Type", "application/json")
    .expect((response) => {
      if (response.status !== 200) {
        fail("Status should be 200.");
      }
      const todo1 = response.body.find((todo: { title: string }) =>
        todo.title === "Todo 1"
      );
      const todo2 = response.body.find((todo: { title: string }) =>
        todo.title === "Todo 2"
      );
      if (todo1 === undefined || todo2 === undefined) {
        fail("Error to get Todos.");
      }
    });
}

Deno.test({
  name: "Integration: Route GET /todo should returns status 200 on success",
  ignore: Deno.env.get("INTEGRATION_TEST_ENEABLED")?.match("true")
    ? false
    : true,
  fn: get_all_todos,
});
