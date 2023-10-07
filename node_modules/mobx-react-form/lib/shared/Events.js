"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _each2 = _interopRequireDefault(require("lodash/each"));

var _merge3 = _interopRequireDefault(require("lodash/merge"));

var _mobx = require("mobx");

var _utils = _interopRequireDefault(require("../utils"));

var _parser = _interopRequireDefault(require("../parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
  Field Events
*/
var _default = {
  /**
   MobX Event (observe/intercept)
   */
  MOBXEvent: function MOBXEvent(_ref) {
    var _this = this;

    var _ref$path = _ref.path,
        path = _ref$path === void 0 ? null : _ref$path,
        _ref$key = _ref.key,
        key = _ref$key === void 0 ? 'value' : _ref$key,
        call = _ref.call,
        type = _ref.type;
    var $instance = this.select(path || this.path, null, null) || this;

    var $call = function $call(change) {
      return call.apply(null, [{
        change: change,
        form: _this.state.form,
        path: $instance.path || null,
        field: $instance.path ? $instance : null
      }]);
    };

    var fn;
    var ffn;

    if (type === 'observer') {
      fn = _mobx.observe;

      ffn = function ffn(cb) {
        return (0, _mobx.observe)($instance.fields, cb);
      };
    }

    if (type === 'interceptor') {
      // eslint-disable-next-line
      key = "$".concat(key);
      fn = _mobx.intercept;
      ffn = $instance.fields.intercept;
    }

    var $dkey = $instance.path ? "".concat(key, "@").concat($instance.path) : key;
    (0, _merge3["default"])(this.state.disposers[type], _defineProperty({}, $dkey, key === 'fields' ? ffn.apply(function (change) {
      return $call(change);
    }) : fn($instance, key, function (change) {
      return $call(change);
    })));
  },

  /**
   Dispose MOBX Events
   */
  dispose: function dispose() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    if (this.path && opt) return this.disposeSingle(opt);
    return this.disposeAll(opt);
  },

  /**
   Dispose All Events (observe/intercept)
   */
  disposeAll: function disposeAll() {
    var dispose = function dispose(disposer) {
      return disposer.apply();
    };

    (0, _each2["default"])(this.state.disposers.interceptor, dispose);
    (0, _each2["default"])(this.state.disposers.observer, dispose);
    this.state.disposers = {
      interceptor: {},
      observer: {}
    };
    return null;
  },

  /**
   Dispose Single Event (observe/intercept)
   */
  disposeSingle: function disposeSingle(_ref2) {
    var type = _ref2.type,
        _ref2$key = _ref2.key,
        key = _ref2$key === void 0 ? 'value' : _ref2$key,
        _ref2$path = _ref2.path,
        path = _ref2$path === void 0 ? null : _ref2$path;

    var $path = _parser["default"].parsePath(_utils["default"].$try(path, this.path)); // eslint-disable-next-line


    if (type === 'interceptor') key = "$".concat(key); // target observables

    this.state.disposers[type]["".concat(key, "@").concat($path)].apply();
    delete this.state.disposers[type]["".concat(key, "@").concat($path)];
  }
};
exports["default"] = _default;
module.exports = exports["default"];