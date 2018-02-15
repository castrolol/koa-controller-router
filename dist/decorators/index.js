"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require("./controller");

Object.keys(_controller).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _controller[key];
    }
  });
});

var _action = require("./action");

Object.keys(_action).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _action[key];
    }
  });
});