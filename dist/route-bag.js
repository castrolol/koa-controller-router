"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouteBag = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require("uuid");

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteBag = exports.RouteBag = function () {
  function RouteBag() {
    _classCallCheck(this, RouteBag);

    this._routes = [];
  }

  _createClass(RouteBag, [{
    key: "getRoutesFor",
    value: function getRoutesFor(method) {
      return this._routes.filter(function (route) {
        return route.method == method;
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this._routes = [];
    }
  }, {
    key: "addAction",
    value: function addAction(routeAction) {
      var id = _uuid2.default.v4();

      this._routes.push(_extends({}, routeAction, {
        id: id
      }));

      return id;
    }
  }, {
    key: "routes",
    get: function get() {
      return this._routes.map(function (_ref) {
        var id = _ref.id,
            path = _ref.path,
            method = _ref.method;
        return { id: id, path: path, method: method };
      });
    }
  }]);

  return RouteBag;
}();

exports.default = new RouteBag();