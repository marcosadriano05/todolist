import { Context } from "../../external/oak.ts";

import { Controller, HttpRequest } from "../presentation/controller.ts";

function oakAdapter(controller: Controller) {
  return async (context: Context) => {
    const requestJson = context.request.body({ type: "json" });
    const data = await requestJson.value;
    const httpRequest: HttpRequest = {
      body: data,
    };
    const httpResponse = await controller.handle(httpRequest);
    context.response.status = httpResponse.statusCode;
    httpResponse.headers?.forEach((header) => {
      context.response.headers.set(
        header.name,
        header.value,
      );
    });
    context.response.body = httpResponse.body;
  };
}

export { oakAdapter };
