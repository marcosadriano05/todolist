// deno-lint-ignore-file no-explicit-any
import { HttpResponse } from "./controller.ts";

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (data: any, headers?: any): HttpResponse => ({
  statusCode: 201,
  body: data,
  headers,
});

export const badRequest = (message: string): HttpResponse => ({
  statusCode: 400,
  body: {
    message,
  },
});

export const notFound = (message: string): HttpResponse => ({
  statusCode: 404,
  body: {
    message,
  },
});

export const serverError = (message: string): HttpResponse => ({
  statusCode: 500,
  body: {
    message,
  },
});
