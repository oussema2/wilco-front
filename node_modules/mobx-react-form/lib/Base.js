"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _mobx = require("mobx");

var _utils = require("./utils");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Base = (_class = (_temp = /*#__PURE__*/function () {
  function Base() {
    var _this = this;

    _classCallCheck(this, Base);

    _defineProperty(this, "noop", function () {});

    _initializerDefineProperty(this, "$submitted", _descriptor, this);

    _initializerDefineProperty(this, "$submitting", _descriptor2, this);

    _initializerDefineProperty(this, "$validated", _descriptor3, this);

    _initializerDefineProperty(this, "$validating", _descriptor4, this);

    _defineProperty(this, "execHook", function (name) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return (0, _utils.$try)(fallback[name], _this.$hooks[name], _this.hooks && _this.hooks.apply(_this, [_this])[name], _this.noop).apply(_this, [_this]);
    });

    _defineProperty(this, "execHandler", function (name, args) {
      var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return [(0, _utils.$try)(_this.$handlers[name] && _this.$handlers[name].apply(_this, [_this]), _this.handlers && _this.handlers.apply(_this, [_this])[name] && _this.handlers.apply(_this, [_this])[name].apply(_this, [_this]), fallback, _this.noop).apply(_this, _toConsumableArray(args)), _this.execHook(name)];
    });

    _defineProperty(this, "intercept", function (opt) {
      return _this.MOBXEvent((0, _isFunction2["default"])(opt) ? {
        type: 'interceptor',
        call: opt
      } : _objectSpread({
        type: 'interceptor'
      }, opt));
    });

    _defineProperty(this, "observe", function (opt) {
      return _this.MOBXEvent((0, _isFunction2["default"])(opt) ? {
        type: 'observer',
        call: opt
      } : _objectSpread({
        type: 'observer'
      }, opt));
    });

    _defineProperty(this, "onClear", function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _this.execHandler('onClear', args, function (e) {
        e.preventDefault();

        _this.clear(true);
      });
    });

    _defineProperty(this, "onReset", function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _this.execHandler('onReset', args, function (e) {
        e.preventDefault();

        _this.reset(true);
      });
    });

    _defineProperty(this, "onSubmit", function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _this.execHandler('onSubmit', args, function (e) {
        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        e.preventDefault();

        _this.submit(o);
      });
    });

    _defineProperty(this, "onAdd", function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _this.execHandler('onAdd', args, function (e, val) {
        e.preventDefault();

        _this.add((0, _utils.$isEvent)(val) ? null : val);
      });
    });

    _defineProperty(this, "onDel", function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return _this.execHandler('onDel', args, function (e, path) {
        e.preventDefault();

        _this.del((0, _utils.$isEvent)(path) ? _this.path : path);
      });
    });

    (0, _mobx.makeObservable)(this);
  }

  _createClass(Base, [{
    key: "submitted",
    get: function get() {
      return (0, _mobx.toJS)(this.$submitted);
    }
  }, {
    key: "submitting",
    get: function get() {
      return (0, _mobx.toJS)(this.$submitting);
    }
  }, {
    key: "validated",
    get: function get() {
      return (0, _mobx.toJS)(this.$validated);
    }
  }, {
    key: "validating",
    get: function get() {
      return (0, _mobx.toJS)(this.$validating);
    }
  }, {
    key: "hasIncrementalKeys",
    get: function get() {
      return this.fields.size && (0, _utils.hasIntKeys)(this.fields);
    }
  }, {
    key: "hasNestedFields",
    get: function get() {
      return this.fields.size !== 0;
    }
  }, {
    key: "size",
    get: function get() {
      return this.fields.size;
    }
    /**
     Interceptor
     */

  }]);

  return Base;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "$submitted", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "$submitting", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "$validated", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "$validating", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "submitted", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "submitted"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "submitting", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "submitting"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "validated", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "validated"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "validating", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "validating"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "hasIncrementalKeys", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "hasIncrementalKeys"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "hasNestedFields", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "hasNestedFields"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "size", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "size"), _class.prototype)), _class);
exports["default"] = Base;
module.exports = exports["default"];