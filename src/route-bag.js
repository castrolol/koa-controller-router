// @flow
import uuid from "uuid";

export class RouteBag {
  _routes: Route[] = [];

  get routes(): Route[] {
    return this._routes;
  }
 

  reset() {
    this._routes = [];
  }

  addAction(routeAction: Route): Uuid {
    const id: string = uuid.v4();

    this._routes.push({
      ...routeAction,
      id
    });

    return id;
  }
}

export default new RouteBag();
