import routeBag from "./route-bag";
import Path from "path-parser";

class Router {
  paths: { [key: HttpMethod]: Route[] };

  constructor() {
    this.paths = {};

    const routes = routeBag.routes;

    routes.forEach(route => {
      if (route.method in this.paths == false) {
        this.paths[route.method] = [];
      }

      let path = route.path;

      if (route.controller && "$prefix" in route.controller) {
        path = "/" + route.controller.$prefix + "/" + path;
      } else {
        path = "/" + path;
      }

      const alreadyExists = this.paths[route.method].some(({ path: p }) => p == path);

      if(alreadyExists) throw new Error(`The route "${path}" already exists`);

      this.paths[route.method].push({
        ...route,
        path,
        matcher: new Path(path)
      });
    });
  }

  resolveRoute(method, path) {
    const paths = this.paths[method];

    if (!paths) return null;

    let pathMatched = null;

    const matched = paths.some(({ matcher, controller, action }: Route) => {
      const params = matcher.test(path, { trailingSlash: true });

      if (params == null) return false;

      pathMatched = {
        controller,
        action,
        params
      };

      return true;
    });

    return pathMatched;
  }
}

export default Router;
