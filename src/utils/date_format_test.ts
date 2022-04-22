import { assertEquals } from "../../external/tests.ts";
import { formatToDatetime } from "./date_format.ts";

Deno.test("FormatDate: should format to YYYY-MM-DD HH:mm:ss", function () {
  let result = formatToDatetime("10/11/2020");
  assertEquals(result, "2020-10-11 00:00:00");

  result = formatToDatetime("2020-09-02T10:09:05");
  assertEquals(result, "2020-09-02 10:09:05");
});
