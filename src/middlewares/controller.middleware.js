// @flow
import status from "../http/status-code";

export function controllerMiddleware() {

  return async (ctx: MiddlewareContext, next: MiddlewareNext): Promise<void> => {
    const { method, path }: MiddlewareContext = ctx;

    try {
      if ("matchedRoute" in ctx && ctx.matchedRoute) {
        const matchedRoute = ctx.matchedRoute;
        const { controller, action, params } = matchedRoute;

        ctx.status = status.ok;

        const ctrl = new controller.constructor(ctx);

        const result = action.apply(ctrl, params || []);

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
