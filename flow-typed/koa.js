type MiddlewareContext = {
  method: HttpMethod,
  path: string,
  status: HttpStatusCode,
  matchedRoute?: RouteResult,
};

type MiddlewareNext = () => Promise<*>;
