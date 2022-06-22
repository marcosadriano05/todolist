import { assertEquals, describe, it } from "/deps/tests.ts";
import { formatToDatetime } from "/src/utils/date_format.ts";

describe("FormatDate", () => {
  it("should format to YYYY-MM-DD HH:mm:ss", () => {
    let result = formatToDatetime("10/11/2020");
    assertEquals(result, "2020-10-11 00:00:00");

    result = formatToDatetime("2020-09-02T10:09:05");
    assertEquals(result, "2020-09-02 10:09:05");
  });
});
