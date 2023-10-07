"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prototypes = exports["default"] = void 0;

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _head2 = _interopRequireDefault(require("lodash/head"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _toString2 = _interopRequireDefault(require("lodash/toString"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isDate2 = _interopRequireDefault(require("lodash/isDate"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _toNumber2 = _interopRequireDefault(require("lodash/toNumber"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _mobx = require("mobx");

var _Base2 = _interopRequireDefault(require("./Base"));

var _utils = require("./utils");

var _parser = require("./parser");

var _obj, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var setupFieldProps = function setupFieldProps(instance, props, data) {
  return Object.assign(instance, {
    $label: props.$label || data && data.label || '',
    $placeholder: props.$placeholder || data && data.placeholder || '',
    $disabled: props.$disabled || data && data.disabled || false,
    $bindings: props.$bindings || data && data.bindings || 'default',
    $related: props.$related || data && data.related || [],
    $validators: (0, _mobx.toJS)(props.$validators || data && data.validators || null),
    $validatedWith: props.$validatedWith || data && data.validatedWith || 'value',
    $rules: props.$rules || data && data.rules || null,
    $observers: props.$observers || data && data.observers || null,
    $interceptors: props.$interceptors || data && data.interceptors || null,
    $extra: props.$extra || data && data.extra || null,
    $options: props.$options || data && data.options || {},
    $hooks: props.$hooks || data && data.hooks || {},
    $handlers: props.$handlers || data && data.handlers || {}
  });
};

var setupDefaultProp = function setupDefaultProp(instance, data, props, update, _ref) {
  var isEmptyArray = _ref.isEmptyArray;
  return (0, _parser.parseInput)(instance.$input, {
    nullable: true,
    isEmptyArray: isEmptyArray,
    type: instance.type,
    unified: update ? (0, _parser.defaultValue)({
      type: instance.type
    }) : data && data["default"],
    separated: props.$default,
    fallback: instance.$initial
  });
};

var Field = (_class = (_temp = /*#__PURE__*/function (_Base) {
  _inherits(Field, _Base);

  var _super = _createSuper(Field);

  function Field(_ref2) {
    var _this4;

    var key = _ref2.key,
        path = _ref2.path,
        _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? {} : _ref2$data,
        _ref2$props = _ref2.props,
        props = _ref2$props === void 0 ? {} : _ref2$props,
        _ref2$update = _ref2.update,
        update = _ref2$update === void 0 ? false : _ref2$update,
        state = _ref2.state;

    _classCallCheck(this, Field);

    _this4 = _super.call(this);

    _defineProperty(_assertThisInitialized(_this4), "fields", _mobx.observable.map ? _mobx.observable.map({}) : (0, _mobx.asMap)({}));

    _defineProperty(_assertThisInitialized(_this4), "hasInitialNestedFields", false);

    _defineProperty(_assertThisInitialized(_this4), "incremental", false);

    _defineProperty(_assertThisInitialized(_this4), "id", void 0);

    _defineProperty(_assertThisInitialized(_this4), "key", void 0);

    _defineProperty(_assertThisInitialized(_this4), "name", void 0);

    _defineProperty(_assertThisInitialized(_this4), "path", void 0);

    _defineProperty(_assertThisInitialized(_this4), "state", void 0);

    _defineProperty(_assertThisInitialized(_this4), "$observers", void 0);

    _defineProperty(_assertThisInitialized(_this4), "$interceptors", void 0);

    _defineProperty(_assertThisInitialized(_this4), "$hooks", {});

    _defineProperty(_assertThisInitialized(_this4), "$handlers", {});

    _defineProperty(_assertThisInitialized(_this4), "$input", function ($) {
      return $;
    });

    _defineProperty(_assertThisInitialized(_this4), "$output", function ($) {
      return $;
    });

    _initializerDefineProperty(_assertThisInitialized(_this4), "$options", _descriptor, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$value", _descriptor2, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$type", _descriptor3, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$label", _descriptor4, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$placeholder", _descriptor5, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$default", _descriptor6, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$initial", _descriptor7, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$bindings", _descriptor8, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$extra", _descriptor9, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$related", _descriptor10, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$validatedWith", _descriptor11, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$validators", _descriptor12, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$rules", _descriptor13, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$disabled", _descriptor14, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$focused", _descriptor15, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$touched", _descriptor16, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$changed", _descriptor17, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$blurred", _descriptor18, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$deleted", _descriptor19, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$clearing", _descriptor20, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "$resetting", _descriptor21, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "autoFocus", _descriptor22, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "showError", _descriptor23, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "errorSync", _descriptor24, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "errorAsync", _descriptor25, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "validationErrorStack", _descriptor26, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "validationFunctionsData", _descriptor27, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "validationAsyncData", _descriptor28, _assertThisInitialized(_this4));

    _initializerDefineProperty(_assertThisInitialized(_this4), "files", _descriptor29, _assertThisInitialized(_this4));

    _defineProperty(_assertThisInitialized(_this4), "sync", (0, _mobx.action)(function (e) {
      var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      _this4.$changed = true;

      var $get = function $get($) {
        return (0, _utils.$isBool)($, _this4.value) ? $.target.checked : $.target.value;
      }; // assume "v" or "e" are the values


      if ((0, _isNil2["default"])(e) || (0, _isNil2["default"])(e.target)) {
        if (!(0, _isNil2["default"])(v) && !(0, _isNil2["default"])(v.target)) {
          v = $get(v); // eslint-disable-line
        }

        _this4.value = (0, _utils.$try)(e, v);
        return;
      }

      if (!(0, _isNil2["default"])(e.target)) {
        _this4.value = $get(e);
        return;
      }

      _this4.value = e;
    }));

    _defineProperty(_assertThisInitialized(_this4), "onChange", function () {
      var _this5;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _this4.type === 'file' ? (_this5 = _this4).onDrop.apply(_this5, args) : _this4.execHandler('onChange', args, _this4.sync);
    });

    _defineProperty(_assertThisInitialized(_this4), "onToggle", function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _this4.execHandler('onToggle', args, _this4.sync);
    });

    _defineProperty(_assertThisInitialized(_this4), "onBlur", function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _this4.execHandler('onBlur', args, (0, _mobx.action)(function () {
        if (!_this4.$blurred) {
          _this4.$blurred = true;
        }

        _this4.$focused = false;
      }));
    });

    _defineProperty(_assertThisInitialized(_this4), "onFocus", function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _this4.execHandler('onFocus', args, (0, _mobx.action)(function () {
        _this4.$focused = true;
        _this4.$touched = true;
      }));
    });

    _defineProperty(_assertThisInitialized(_this4), "onDrop", function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return _this4.execHandler('onDrop', args, (0, _mobx.action)(function () {
        var e = args[0];
        var files = null;

        if ((0, _utils.$isEvent)(e) && (0, _utils.$hasFiles)(e)) {
          files = (0, _map2["default"])(e.target.files);
        }

        _this4.files = files || args;
      }));
    });

    (0, _mobx.makeObservable)(_assertThisInitialized(_this4));
    _this4.state = state;

    _this4.setupField(key, path, data, props, update);

    _this4.checkValidationPlugins();

    _this4.initNestedFields(data, update);

    _this4.incremental = _this4.hasIncrementalKeys !== 0;
    _this4.debouncedValidation = (0, _debounce2["default"])(_this4.validate, _this4.state.options.get('validationDebounceWait', _assertThisInitialized(_this4)), _this4.state.options.get('validationDebounceOptions', _assertThisInitialized(_this4)));

    _this4.observeValidationOnBlur();

    _this4.observeValidationOnChange();

    _this4.initMOBXEvent('observers');

    _this4.initMOBXEvent('interceptors');

    _this4.execHook('onInit');

    return _this4;
  }
  /* ------------------------------------------------------------------ */

  /* COMPUTED */


  _createClass(Field, [{
    key: "checkValidationErrors",
    get: function get() {
      return this.validationAsyncData.valid === false && !(0, _isEmpty2["default"])(this.validationAsyncData) || !(0, _isEmpty2["default"])(this.validationErrorStack) || (0, _isString2["default"])(this.errorAsync) || (0, _isString2["default"])(this.errorSync);
    }
  }, {
    key: "checked",
    get: function get() {
      return this.type === 'checkbox' ? this.value : undefined;
    }
  }, {
    key: "value",
    get: function get() {
      return this.getComputedProp('value');
    },
    set: function set(newVal) {
      if (this.$value === newVal) return; // handle numbers

      if (this.state.options.get('autoParseNumbers', this) === true) {
        if ((0, _isNumber2["default"])(this.$initial)) {
          if (new RegExp('^-?\\d+(,\\d+)*(\\.\\d+([eE]\\d+)?)?$', 'g').exec(newVal)) {
            this.$value = (0, _toNumber2["default"])(newVal);
            return;
          }
        }
      } // handle parse value


      this.$value = newVal;
    }
  }, {
    key: "initial",
    get: function get() {
      return this.$initial ? (0, _mobx.toJS)(this.$initial) : this.getComputedProp('initial');
    },
    set: function set(val) {
      this.$initial = (0, _parser.parseInput)(this.$input, {
        separated: val
      });
    }
  }, {
    key: "default",
    get: function get() {
      return this.$default ? (0, _mobx.toJS)(this.$default) : this.getComputedProp('default');
    },
    set: function set(val) {
      this.$default = (0, _parser.parseInput)(this.$input, {
        separated: val
      });
    }
  }, {
    key: "actionRunning",
    get: function get() {
      return this.submitting || this.clearing || this.resetting;
    }
  }, {
    key: "type",
    get: function get() {
      return (0, _mobx.toJS)(this.$type);
    }
  }, {
    key: "label",
    get: function get() {
      return (0, _mobx.toJS)(this.$label);
    }
  }, {
    key: "placeholder",
    get: function get() {
      return (0, _mobx.toJS)(this.$placeholder);
    }
  }, {
    key: "extra",
    get: function get() {
      return (0, _mobx.toJS)(this.$extra);
    }
  }, {
    key: "options",
    get: function get() {
      return (0, _mobx.toJS)(this.$options);
    }
  }, {
    key: "bindings",
    get: function get() {
      return (0, _mobx.toJS)(this.$bindings);
    }
  }, {
    key: "related",
    get: function get() {
      return (0, _mobx.toJS)(this.$related);
    }
  }, {
    key: "disabled",
    get: function get() {
      return (0, _mobx.toJS)(this.$disabled);
    }
  }, {
    key: "rules",
    get: function get() {
      return (0, _mobx.toJS)(this.$rules);
    }
  }, {
    key: "validators",
    get: function get() {
      return (0, _mobx.toJS)(this.$validators);
    }
  }, {
    key: "validatedValue",
    get: function get() {
      return (0, _parser.parseCheckOutput)(this, this.$validatedWith);
    }
  }, {
    key: "error",
    get: function get() {
      if (this.showError === false) return null;
      return this.errorAsync || this.errorSync || null;
    }
  }, {
    key: "hasError",
    get: function get() {
      return this.checkValidationErrors || this.check('hasError', true);
    }
  }, {
    key: "isValid",
    get: function get() {
      return !this.checkValidationErrors && this.check('isValid', true);
    }
  }, {
    key: "isDefault",
    get: function get() {
      return !(0, _isNil2["default"])(this["default"]) && (0, _isEqual2["default"])(this["default"], this.value);
    }
  }, {
    key: "isDirty",
    get: function get() {
      return !(0, _isUndefined2["default"])(this.initial) && !(0, _isEqual2["default"])(this.initial, this.value);
    }
  }, {
    key: "isPristine",
    get: function get() {
      return !(0, _isNil2["default"])(this.initial) && (0, _isEqual2["default"])(this.initial, this.value);
    }
  }, {
    key: "isEmpty",
    get: function get() {
      if (this.hasNestedFields) return this.check('isEmpty', true);
      if ((0, _isBoolean2["default"])(this.value)) return !!this.$value;
      if ((0, _isNumber2["default"])(this.value)) return false;
      if ((0, _isDate2["default"])(this.value)) return false;
      return (0, _isEmpty2["default"])(this.value);
    }
  }, {
    key: "resetting",
    get: function get() {
      return this.hasNestedFields ? this.check('resetting', true) : this.$resetting;
    }
  }, {
    key: "clearing",
    get: function get() {
      return this.hasNestedFields ? this.check('clearing', true) : this.$clearing;
    }
  }, {
    key: "focused",
    get: function get() {
      return this.hasNestedFields ? this.check('focused', true) : this.$focused;
    }
  }, {
    key: "blurred",
    get: function get() {
      return this.hasNestedFields ? this.check('blurred', true) : this.$blurred;
    }
  }, {
    key: "touched",
    get: function get() {
      return this.hasNestedFields ? this.check('touched', true) : this.$touched;
    }
  }, {
    key: "changed",
    get: function get() {
      return this.hasNestedFields ? this.check('changed', true) : this.$changed;
    }
  }, {
    key: "deleted",
    get: function get() {
      return this.hasNestedFields ? this.check('deleted', true) : this.$deleted;
    }
    /* ------------------------------------------------------------------ */

    /* EVENTS HANDLERS */

  }]);

  return Field;
}(_Base2["default"]), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "$options", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "$value", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "$type", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "$label", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "$placeholder", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "$default", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "$initial", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "$bindings", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "$extra", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "$related", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "$validatedWith", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "$validators", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "$rules", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, "$disabled", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, "$focused", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, "$touched", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, "$changed", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class.prototype, "$blurred", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class.prototype, "$deleted", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class.prototype, "$clearing", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor21 = _applyDecoratedDescriptor(_class.prototype, "$resetting", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor22 = _applyDecoratedDescriptor(_class.prototype, "autoFocus", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor23 = _applyDecoratedDescriptor(_class.prototype, "showError", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor24 = _applyDecoratedDescriptor(_class.prototype, "errorSync", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor25 = _applyDecoratedDescriptor(_class.prototype, "errorAsync", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor26 = _applyDecoratedDescriptor(_class.prototype, "validationErrorStack", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor27 = _applyDecoratedDescriptor(_class.prototype, "validationFunctionsData", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor28 = _applyDecoratedDescriptor(_class.prototype, "validationAsyncData", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor29 = _applyDecoratedDescriptor(_class.prototype, "files", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "checkValidationErrors", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "checkValidationErrors"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "checked", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "checked"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "value", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "value"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "initial", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "initial"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "default", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "default"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "actionRunning", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "actionRunning"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "type", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "type"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "label", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "label"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "placeholder", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "placeholder"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "extra", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "extra"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "options", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "options"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "bindings", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "bindings"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "related", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "related"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "disabled", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "disabled"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "rules", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "rules"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "validators", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "validators"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "validatedValue", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "validatedValue"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "error", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "error"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "hasError", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "hasError"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isValid", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isValid"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isDefault", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isDefault"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isDirty", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isDirty"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isPristine", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isPristine"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isEmpty", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isEmpty"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "resetting", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "resetting"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "clearing", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "clearing"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "focused", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "focused"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "blurred", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "blurred"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "touched", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "touched"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "changed", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "changed"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "deleted", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "deleted"), _class.prototype)), _class);
exports["default"] = Field;

/**
  Prototypes
*/
var prototypes = (_obj = {
  setupField: function setupField($key, $path, $data, $props, update) {
    this.key = $key;
    this.path = $path;
    this.id = this.state.options.get('uniqueId').apply(this, [this]);
    var struct = this.state.struct();
    var structPath = (0, _utils.pathToStruct)(this.path);
    var isEmptyArray = Array.isArray(struct) ? struct.filter(function (s) {
      return s.startsWith(structPath);
    }).find(function (s) {
      return s.substr(structPath.length, 2) === '[]';
    }) : Array.isArray((0, _get2["default"])(struct, this.path));
    var $type = $props.$type,
        $input = $props.$input,
        $output = $props.$output; // eslint-disable-next-line
    // if (_.isNil($data)) $data = '';

    if ((0, _isPlainObject2["default"])($data)) {
      var type = $data.type,
          input = $data.input,
          output = $data.output;
      this.name = (0, _toString2["default"])($data.name || $key);
      this.$type = $type || type || 'text';
      this.$input = (0, _utils.$try)($input, input, this.$input);
      this.$output = (0, _utils.$try)($output, output, this.$output);
      this.$value = (0, _parser.parseInput)(this.$input, {
        isEmptyArray: isEmptyArray,
        type: this.type,
        unified: $data.value,
        separated: $props.$value,
        fallback: $props.$initial
      });
      this.$initial = (0, _parser.parseInput)(this.$input, {
        nullable: true,
        isEmptyArray: isEmptyArray,
        type: this.type,
        unified: $data.initial,
        separated: $props.$initial,
        fallback: this.$value
      });
      this.$default = setupDefaultProp(this, $data, $props, update, {
        isEmptyArray: isEmptyArray
      });
      setupFieldProps(this, $props, $data);
      return;
    }
    /* The field IS the value here */


    this.name = (0, _toString2["default"])($key);
    this.$type = $type || 'text';
    this.$input = (0, _utils.$try)($input, this.$input);
    this.$output = (0, _utils.$try)($output, this.$output);
    this.$value = (0, _parser.parseInput)(this.$input, {
      isEmptyArray: isEmptyArray,
      type: this.type,
      unified: $data,
      separated: $props.$value
    });
    this.$initial = (0, _parser.parseInput)(this.$input, {
      nullable: true,
      isEmptyArray: isEmptyArray,
      type: this.type,
      unified: $data,
      separated: $props.$initial,
      fallback: this.$value
    });
    this.$default = setupDefaultProp(this, $data, $props, update, {
      isEmptyArray: isEmptyArray
    });
    setupFieldProps(this, $props, $data);
  },
  getComputedProp: function getComputedProp(key) {
    var _this = this;

    if (this.incremental || this.hasNestedFields) {
      var $val = key === 'value' ? this.get(key, false) : (0, _mobx.untracked)(function () {
        return _this.get(key, false);
      });
      return !(0, _isEmpty2["default"])($val) ? $val : [];
    }

    var val = this["$".concat(key)];

    if ((0, _isArray2["default"])(val) || (0, _mobx.isObservableArray)(val)) {
      return [].slice.call(val);
    }

    return (0, _mobx.toJS)(val);
  },
  checkValidationPlugins: function checkValidationPlugins() {
    var drivers = this.state.form.validator.drivers;
    var form = this.state.form.name ? "".concat(this.state.form.name, "/") : '';

    if ((0, _isNil2["default"])(drivers.dvr) && !(0, _isNil2["default"])(this.rules)) {
      throw new Error("The DVR validation rules are defined but no DVR plugin provided. Field: \"".concat(form + this.path, "\"."));
    }

    if ((0, _isNil2["default"])(drivers.vjf) && !(0, _isNil2["default"])(this.validators)) {
      throw new Error("The VJF validators functions are defined but no VJF plugin provided. Field: \"".concat(form + this.path, "\"."));
    }
  },
  initNestedFields: function initNestedFields(field, update) {
    var fields = (0, _isNil2["default"])(field) ? null : field.fields;

    if ((0, _isArray2["default"])(fields) && !(0, _isEmpty2["default"])(fields)) {
      this.hasInitialNestedFields = true;
    }

    this.initFields({
      fields: fields
    }, update);

    if (!update && (0, _isArray2["default"])(fields) && (0, _isEmpty2["default"])(fields)) {
      if ((0, _isArray2["default"])(this.value) && !(0, _isEmpty2["default"])(this.value)) {
        this.hasInitialNestedFields = true;
        this.initFields({
          fields: fields,
          values: this.value
        }, update);
      }
    }
  },
  invalidate: function invalidate(message) {
    var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (async === true) {
      this.errorAsync = message;
      return;
    }

    if ((0, _isArray2["default"])(message)) {
      this.validationErrorStack = message;
      this.showErrors(true);
      return;
    }

    this.validationErrorStack.unshift(message);
    this.showErrors(true);
  },
  setValidationAsyncData: function setValidationAsyncData() {
    var valid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    this.validationAsyncData = {
      valid: valid,
      message: message
    };
  },
  resetValidation: function resetValidation() {
    var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this.showError = true;
    this.errorSync = null;
    this.errorAsync = null;
    this.validationAsyncData = {};
    this.validationFunctionsData = [];
    this.validationErrorStack = [];
    if (deep) this.each(function (field) {
      return field.resetValidation();
    });
  },
  clear: function clear() {
    var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.$clearing = true;
    this.$touched = false;
    this.$changed = false;
    this.$blurred = false;
    this.$value = (0, _parser.defaultClearValue)({
      value: this.$value
    });
    this.files = undefined;
    if (deep) this.each(function (field) {
      return field.clear(true);
    });
    this.validate({
      showErrors: this.state.options.get('showErrorsOnClear', this)
    });
  },
  reset: function reset() {
    var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.$resetting = true;
    this.$touched = false;
    this.$changed = false;
    this.$blurred = false;
    var useDefaultValue = this.$default !== this.$initial;
    if (useDefaultValue) this.value = this.$default;
    if (!useDefaultValue) this.value = this.$initial;
    this.files = undefined;
    if (deep) this.each(function (field) {
      return field.reset(true);
    });
    this.validate({
      showErrors: this.state.options.get('showErrorsOnReset', this)
    });
  },
  focus: function focus() {
    // eslint-disable-next-line
    this.state.form.each(function (field) {
      return field.autoFocus = false;
    });
    this.autoFocus = true;
  },
  showErrors: function showErrors() {
    var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.showError = show;
    this.errorSync = (0, _head2["default"])(this.validationErrorStack);
    this.each(function (field) {
      return field.showErrors(show);
    });
  },
  showAsyncErrors: function showAsyncErrors() {
    if (this.validationAsyncData.valid === false) {
      this.errorAsync = this.validationAsyncData.message;
      return;
    }

    this.errorAsync = null;
  },
  observeValidationOnBlur: function observeValidationOnBlur() {
    var _this2 = this;

    var opt = this.state.options;

    if (opt.get('validateOnBlur', this)) {
      this.disposeValidationOnBlur = (0, _mobx.observe)(this, '$focused', function (change) {
        return change.newValue === false && _this2.debouncedValidation({
          showErrors: opt.get('showErrorsOnBlur', _this2)
        });
      });
    }
  },
  observeValidationOnChange: function observeValidationOnChange() {
    var _this3 = this;

    var opt = this.state.options;

    if (opt.get('validateOnChange', this)) {
      this.disposeValidationOnChange = (0, _mobx.observe)(this, '$value', function () {
        return !_this3.actionRunning && _this3.debouncedValidation({
          showErrors: opt.get('showErrorsOnChange', _this3)
        });
      });
    } else if (opt.get('validateOnChangeAfterInitialBlur', this) || opt.get('validateOnChangeAfterSubmit', this)) {
      this.disposeValidationOnChange = (0, _mobx.observe)(this, '$value', function () {
        return !_this3.actionRunning && (opt.get('validateOnChangeAfterInitialBlur', _this3) && _this3.blurred || opt.get('validateOnChangeAfterSubmit', _this3) && _this3.state.form.submitted) && _this3.debouncedValidation({
          showErrors: opt.get('showErrorsOnChange', _this3)
        });
      });
    }
  },
  initMOBXEvent: function initMOBXEvent(type) {
    if (!(0, _isArray2["default"])(this["$".concat(type)])) return;
    var fn;
    if (type === 'observers') fn = this.observe;
    if (type === 'interceptors') fn = this.intercept;
    this["$".concat(type)].map(function (obj) {
      return fn((0, _omit2["default"])(obj, 'path'));
    });
  },
  bind: function bind() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return this.state.bindings.load(this, this.bindings, props);
  }
}, (_applyDecoratedDescriptor(_obj, "setupField", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "setupField"), _obj), _applyDecoratedDescriptor(_obj, "initNestedFields", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "initNestedFields"), _obj), _applyDecoratedDescriptor(_obj, "invalidate", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "invalidate"), _obj), _applyDecoratedDescriptor(_obj, "setValidationAsyncData", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "setValidationAsyncData"), _obj), _applyDecoratedDescriptor(_obj, "resetValidation", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "resetValidation"), _obj), _applyDecoratedDescriptor(_obj, "clear", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "clear"), _obj), _applyDecoratedDescriptor(_obj, "reset", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "reset"), _obj), _applyDecoratedDescriptor(_obj, "focus", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "focus"), _obj), _applyDecoratedDescriptor(_obj, "showErrors", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "showErrors"), _obj), _applyDecoratedDescriptor(_obj, "showAsyncErrors", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "showAsyncErrors"), _obj)), _obj);
exports.prototypes = prototypes;