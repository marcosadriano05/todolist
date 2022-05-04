// deno-lint-ignore-file no-explicit-any
import {
  OpineRequest,
  OpineResponse,
  ParamsDictionary,
} from "../../external/opine.ts";

import { Controller, HttpRequest } from "../presentation/controller.ts";

function opineAdapter(controller: Controller) {
  return async (
    req: OpineRequest<ParamsDictionary, any, any>,
    res: OpineResponse<any>,
  ) => {
    const data = req.body;
    const httpRequest: HttpRequest = {
      body: data,
    };
    const httpResponse = await controller.handle(httpRequest);
    httpResponse.headers?.forEach((header) => {
      res.setHeader(
        header.name,
        header.value,
      );
    });

    return res.setStatus(httpResponse.statusCode).json(httpResponse.body);
  };
}

export { opineAdapter };
