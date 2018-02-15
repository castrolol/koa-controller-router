// @flow
import { Path } from "path-parser";

type Uuid = string;

type HttpMethod = "POST" | "GET" | "PUT" | "DELETE" | "OPTION" | "HEAD";

type WithId = { id: Uuid };

type RoutePath = WithId & {
  path: string
};

type RouteAction = {
  action: Function,
  controller: Object,
  path: string,
  method: HttpMethod,
  matcher?: ?Path
};

type Route = RouteAction & WithId;
