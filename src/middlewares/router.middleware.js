// @flow
import Router from "../router";
import status from "../http/status-code";

export function routerMiddleware() {
  let router = null;

  return async (ctx: MiddlewareContext, next: MiddlewareNext): Promise<void> => {
    const { method, path }: MiddlewareContext = ctx;

    if(router == null){
      router = new Router();
    }

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

