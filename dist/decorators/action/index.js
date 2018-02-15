"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = post;
exports.get = get;
exports.put = put;
exports.del = del;

var _routeBag = require("../../route-bag");

var _routeBag2 = _interopRequireDefault(_routeBag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addToBag(method, controller, action, path) {
  _routeBag2.default.addAction({
    action: action,
    controller: controller,
    path: path,
    method: method
  });
}

function post() {
  var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  return function (target, key, descriptor) {
    addToBag("POST", target.constructor, target[key], route);
    return descriptor;
  };
}

function get() {
  var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  return function (target, key, descriptor) {
    addToBag("GET", target, target[key], route);
    return descriptor;
  };
}

function put() {
  var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  return function (target, key, descriptor) {
    addToBag("PUT", target, target[key], route);
    return descriptor;
  };
}

function del() {
  var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  return function (target, key, descriptor) {
    addToBag("DELETE", target, target[key], route);
    return descriptor;
  };
}