// @flow

import routerBag from "../../route-bag";

function addToBag(method: HttpMethod, controller: Constructor, action: Function, path: string) {
  routerBag.addAction({
    action,
    controller,
    path,
    method
  });
}

export function post(route: string = ""): MemberDecorator {
  return function(
    target: Constructor,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    addToBag("POST", target.constructor, target[key], route);
    return descriptor;
  };
}

export function get(route: string = ""): MemberDecorator {
  return function(
    target: Constructor,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    addToBag("GET", target.constructor, target[key], route);
    return descriptor;
  };
}

export function put(route: string = ""): MemberDecorator {
  return function(
    target: Constructor,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    addToBag("PUT", target.constructor, target[key], route);
    return descriptor;
  };
}

export function del(route: string = ""): MemberDecorator {
  return function(
    target: Constructor,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    addToBag("DELETE", target.constructor, target[key], route);
    return descriptor;
  };
}
