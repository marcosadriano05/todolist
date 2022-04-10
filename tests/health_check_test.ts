import { fail, superoak } from "../external/tests.ts";

import { app } from "../src/main/app.ts";

async function health_check_returns_status_200() {
  const request = await superoak(app);
  await request.get("/health-check").expect((res) => {
    if (res.status !== 200) {
      fail("Status code should be 200");
    }
  });
}

Deno.test({
  name: "Integration: Route GET /health-check should returns status 200",
  ignore: Deno.env.get("INTEGRATION_TEST_ENEABLED")?.match("true")
    ? false
    : true,
  fn: health_check_returns_status_200,
});
