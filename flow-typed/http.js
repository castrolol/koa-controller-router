// @flow
import Path from "path-parser";

type Uuid = string;

type HttpMethod = "POST" | "GET" | "PUT" | "DELETE" | "OPTION" | "HEAD";

type HttpStatusCode = 404 | 200;

type RoutePath = {
  id?: Uuid,
  path: string
};

type Controller = Constructor;

type ParamsDictionary = { [key: string]: mixed };

type Route = {
  id?: Uuid,
  action: Function,
  controller: Controller,
  path: string,
  method: HttpMethod,
  matcher?: Path
};

type RouteResult = {
  action: Function,
  controller: Controller,
  params: ?ParamsDictionary
};
