"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefix = prefix;
function prefix(route) {
  return function (controllerConstructor) {
    controllerConstructor.$prefix = route;
  };
}