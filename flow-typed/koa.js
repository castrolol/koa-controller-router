type MiddlewareContext = {
  method: HttpMethod,
  path: string,
  status: HttpStatusCode,
  matchedRoute?: RouteResult,
  body?: mixed
};

type MiddlewareNext = () => Promise<*>;
