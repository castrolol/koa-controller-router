// @flow

export function prefix(route: string): ClassDecorator {
  return function(controllerConstructor: Constructor) {
    controllerConstructor.$prefix = route; 
  };
}
