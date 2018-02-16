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

    try {
      const { controller, action, params } = matched;

      ctx.status = status.ok;

      const result = action.call(controller, params);

      if (result instanceof Promise) {
        await result;
      }
    } catch (error) {
        console.error(error);
      ctx.status = status.internalServerError;
    }

    return next();
  };
}

export default controllerRouterMiddleware;
