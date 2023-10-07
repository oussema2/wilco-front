"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prototypes = exports["default"] = void 0;

var _set2 = _interopRequireDefault(require("lodash/set"));

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _each2 = _interopRequireDefault(require("lodash/each"));

var _mobx = require("mobx");

var _Base2 = _interopRequireDefault(require("./Base"));

var _Validator = _interopRequireDefault(require("./Validator"));

var _State = _interopRequireDefault(require("./State"));

var _Field = _interopRequireDefault(require("./Field"));

var _obj, _class, _descriptor, _temp;

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

var Form = (_class = (_temp = /*#__PURE__*/function (_Base) {
  _inherits(Form, _Base);

  var _super = _createSuper(Form);

  function Form() {
    var _this;

    var setup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? null : _ref$name,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? {} : _ref$options,
        _ref$plugins = _ref.plugins,
        plugins = _ref$plugins === void 0 ? {} : _ref$plugins,
        _ref$bindings = _ref.bindings,
        bindings = _ref$bindings === void 0 ? {} : _ref$bindings,
        _ref$hooks = _ref.hooks,
        hooks = _ref$hooks === void 0 ? {} : _ref$hooks,
        _ref$handlers = _ref.handlers,
        handlers = _ref$handlers === void 0 ? {} : _ref$handlers;

    _classCallCheck(this, Form);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "name", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "validator", void 0);

    _defineProperty(_assertThisInitialized(_this), "$hooks", {});

    _defineProperty(_assertThisInitialized(_this), "$handlers", {});

    _initializerDefineProperty(_assertThisInitialized(_this), "fields", _descriptor, _assertThisInitialized(_this));

    _this.name = name;
    _this.$hooks = hooks;
    _this.$handlers = handlers; // load data from initializers methods

    var initial = (0, _each2["default"])({
      setup: setup,
      options: options,
      plugins: plugins,
      bindings: bindings
    }, function (val, key) {
      return (0, _isFunction2["default"])(_this[key]) ? (0, _merge2["default"])(val, _this[key].apply(_assertThisInitialized(_this), [_assertThisInitialized(_this)])) : val;
    });
    _this.state = new _State["default"]({
      form: _assertThisInitialized(_this),
      initial: initial.setup,
      options: initial.options,
      bindings: initial.bindings
    });
    _this.validator = new _Validator["default"]({
      form: _assertThisInitialized(_this),
      plugins: initial.plugins
    });

    _this.initFields(initial.setup);

    _this.debouncedValidation = (0, _debounce2["default"])(_this.validate, _this.state.options.get('validationDebounceWait'), _this.state.options.get('validationDebounceOptions')); // execute validation on form initialization

    if (_this.state.options.get('validateOnInit') === true) {
      _this.validator.validate({
        showErrors: _this.state.options.get('showErrorsOnInit')
      });
    }

    _this.execHook('onInit');

    return _this;
  }
  /* ------------------------------------------------------------------ */

  /* COMPUTED */


  _createClass(Form, [{
    key: "validatedValues",
    get: function get() {
      var data = {};
      this.each(function ($field) {
        return (// eslint-disable-line
          data[$field.path] = $field.validatedValue
        );
      });
      return data;
    }
  }, {
    key: "clearing",
    get: function get() {
      return this.check('clearing', true);
    }
  }, {
    key: "resetting",
    get: function get() {
      return this.check('resetting', true);
    }
  }, {
    key: "error",
    get: function get() {
      return this.validator.error;
    }
  }, {
    key: "hasError",
    get: function get() {
      return !!this.validator.error || this.check('hasError', true);
    }
  }, {
    key: "isValid",
    get: function get() {
      return !this.validator.error && this.check('isValid', true);
    }
  }, {
    key: "isPristine",
    get: function get() {
      return this.check('isPristine', true);
    }
  }, {
    key: "isDirty",
    get: function get() {
      return this.check('isDirty', true);
    }
  }, {
    key: "isDefault",
    get: function get() {
      return this.check('isDefault', true);
    }
  }, {
    key: "isEmpty",
    get: function get() {
      return this.check('isEmpty', true);
    }
  }, {
    key: "focused",
    get: function get() {
      return this.check('focused', true);
    }
  }, {
    key: "touched",
    get: function get() {
      return this.check('touched', true);
    }
  }, {
    key: "changed",
    get: function get() {
      return this.check('changed', true);
    }
  }, {
    key: "disabled",
    get: function get() {
      return this.check('disabled', true);
    }
  }]);

  return Form;
}(_Base2["default"]), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "fields", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _mobx.observable.map ? _mobx.observable.map({}) : (0, _mobx.asMap)({});
  }
}), _applyDecoratedDescriptor(_class.prototype, "validatedValues", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "validatedValues"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "clearing", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "clearing"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "resetting", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "resetting"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "error", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "error"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "hasError", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "hasError"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isValid", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isValid"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isPristine", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isPristine"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isDirty", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isDirty"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isDefault", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isDefault"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isEmpty", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isEmpty"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "focused", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "focused"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "touched", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "touched"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "changed", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "changed"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "disabled", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "disabled"), _class.prototype)), _class);
exports["default"] = Form;

/**
  Prototypes
*/
var prototypes = (_obj = {
  makeField: function makeField(data) {
    return new _Field["default"](data);
  },
  init: function init() {
    var $fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _set2["default"])(this, 'fields', _mobx.observable.map ? _mobx.observable.map({}) : (0, _mobx.asMap)({}));
    this.state.initial.props.values = $fields; // eslint-disable-line

    this.state.current.props.values = $fields; // eslint-disable-line

    this.initFields({
      fields: $fields || this.state.struct()
    });
  },
  invalidate: function invalidate() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    this.validator.error = message || this.state.options.get('defaultGenericError') || true;
  },
  showErrors: function showErrors() {
    var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.each(function (field) {
      return field.showErrors(show);
    });
  },
  clear: function clear() {
    this.$touched = false;
    this.$changed = false;
    this.each(function (field) {
      return field.clear(true);
    });
  },
  reset: function reset() {
    this.$touched = false;
    this.$changed = false;
    this.each(function (field) {
      return field.reset(true);
    });
  }
}, (_applyDecoratedDescriptor(_obj, "init", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "init"), _obj), _applyDecoratedDescriptor(_obj, "invalidate", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "invalidate"), _obj), _applyDecoratedDescriptor(_obj, "clear", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "clear"), _obj), _applyDecoratedDescriptor(_obj, "reset", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "reset"), _obj)), _obj);
exports.prototypes = prototypes;