// @flow
import Router from "../router";
import status from "../http/status-code";

function controllerRouterMiddleware() {
  const router = new Router();

  return async (ctx: MiddlewareContext, next: MiddlewareNext): Promise<void> => {
    const { method, path }: MiddlewareContext = ctx;

    ctx.status = status.notFound;

    if (!router.allowMethod(method)) {
      return next();
    }

    const matched = router.resolveRoute(method, path);

    if (!matched) {
      return next();
    }

    ctx.status = status.noContent;
    ctx.matchedRoute = matched;

    return next();
  };
}

export default controllerRouterMiddleware;
