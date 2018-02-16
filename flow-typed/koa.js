type MiddlewareContext = {
  method: HttpMethod,
  path: string,
  status: HttpStatusCode
};

type MiddlewareNext = () => Promise<*>;
