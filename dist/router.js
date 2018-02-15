"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _routeBag = require("./route-bag");

var _routeBag2 = _interopRequireDefault(_routeBag);

var _pathParser = require("path-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
  function Router() {
    var _this = this;

    _classCallCheck(this, Router);

    this.paths = {};

    var routes = _routeBag2.default.routes;

    routes.forEach(function (route) {
      if (route.method in _this.paths == false) {
        _this.paths[route.method] = [];
      }

      _this.paths[route.method].push(_extends({}, route, {
        matcher: new _pathParser.Path(route.path)
      }));
    });
  }

  _createClass(Router, [{
    key: "resolveRoute",
    value: function resolveRoute(method, path) {
      var paths = this.paths[method];

      var pathMatched = null;

      var matched = paths.some(function (_ref) {
        var matcher = _ref.matcher,
            controller = _ref.controller,
            action = _ref.action;

        var params = matcher.test(path, { trailingSlash: true });

        if (params == null) return false;

        pathMatched = {
          controller: controller,
          action: action,
          params: params
        };

        return true;
      });

      return pathMatched;
    }
  }]);

  return Router;
}();

exports.default = Router;