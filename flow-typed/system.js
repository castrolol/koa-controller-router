// @flow
type Constructor = { 
  constructor: Function,
  $prefix?: string,  
}

type PropertyDescriptor = {
  configurable?: boolean,
  enumerable?: boolean,
  value?: mixed,
  writable?: boolean,
  get: () => mixed,
  set: (v: mixed) => void
};
type ClassDecorator = (constructor: Constructor) => PropertyDescriptor | void;
type MemberDecorator = (
  target: Constructor,
  key: string,
  descriptor: PropertyDescriptor
) => PropertyDescriptor | void;
