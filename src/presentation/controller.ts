// deno-lint-ignore-file no-explicit-any
export interface HttpRequest {
  body?: any;
}

export interface HttpResponse {
  statusCode: number;
  headers?: Header[];
  body?: any;
}

interface Header {
  name: string;
  value: string;
}

export interface Controller {
  handle(request: HttpRequest): HttpResponse;
}
