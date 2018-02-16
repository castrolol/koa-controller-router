// @flow

declare module "path-parser" {
  declare class Path {
    constructor(path: string): Path;

    test(pattern: string): ?{ [key: string]: mixed };
  }

  declare export default typeof Path;
}
