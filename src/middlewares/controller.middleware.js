// @flow
import Router from "../router";
import status from "../http/status-code";

function controllerRouterMiddleware() {
  const router = new Router();

  return async (ctx: MiddlewareContext, next: MiddlewareNext): Promise<void> => {
    const { method, path }: MiddlewareContext = ctx;

    try {
      if ("matchedRoute" in ctx && ctx.matchedRoute) {
        const matchedRoute = ctx.matchedRoute;
        const { controller, action, params } = matchedRoute;

        ctx.status = status.ok;

        const result = action.call(controller, params);
        if (result instanceof Promise) {
          await result;
        }
      }
    } catch (error) {
      console.error(error);
      ctx.status = status.internalServerError;
    }

    return next();
  };
}

export default controllerRouterMiddleware;
