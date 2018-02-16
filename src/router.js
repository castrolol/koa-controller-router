// @flow

import routeBag from "./route-bag";
import Path from "path-parser";

class Router {
  paths: { [key: HttpMethod]: Route[] };

  constructor() {
    this.paths = {};

    const routes = routeBag.routes;

    routes.forEach(route => this._initRoute(route));
  }

  _initRoute(route: Route) {
    if (route.method in this.paths == false) {
      this.paths[route.method] = [];
    }

    let path = route.path;

    if (route.controller && "$prefix" in route.controller && route.controller.$prefix) {
      path = "/" + route.controller.$prefix + "/" + path;
    } else {
      path = "/" + path;
    }

    if (path.length > 1 && path.endsWith("/")) {
      path = path.replace(/\/{1,}$/i, "");
      if (!path) path = "/";
    }

    const alreadyExists = this.paths[route.method].some(({ path: p }) => p == path);

    if (alreadyExists) throw new Error(`The route "${path}" already exists`);

    this.paths[route.method].push({
      ...route,
      path,
      matcher: new Path(path)
    });
  }

  _filterRoute(route: Route, path: string): ?RouteResult {
    const { matcher, controller, action }: Route = route;

    let pathMatched: ?RouteResult = null;

    const params: ?ParamsDictionary = matcher && matcher.test(path, { trailingSlash: true });

    if (params == null) return null;

    pathMatched = {
      controller,
      action,
      params: [params]
    };

    return pathMatched;
  }

  resolveRoute(method: HttpMethod, path: string): ?RouteResult {
    const paths = this.paths[method];

    if (!paths) return null;

    const matched: ?RouteResult =
      paths
        .map((route: Route) => this._filterRoute(route, path))
        .filter((result: ?RouteResult) => result != null)[0] || null;

    return matched;
  }

  allowMethod(method: ?HttpMethod) {
    if (!method) return false;

    if (method in this.paths) return true;

    return false;
  }
}

export default Router;
