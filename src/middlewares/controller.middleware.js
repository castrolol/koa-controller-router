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
        let ctrl: any;
        try {
          let ctrl = new (controller: any)(ctx);
        } catch (e) {
          if (e.toString().indexOf("is not a constructor") >= 0) {
            ctrl = new controller.constructor(ctx);
          }
        }

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
