// @flow

export function prefix(route: string): ClassDecorator {
  return function(controllerConstructor: Function) {
    controllerConstructor.$prefix = route; 
  };
}
