"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _mobx = require("mobx");

var _Options = _interopRequireDefault(require("./Options"));

var _Bindings = _interopRequireDefault(require("./Bindings"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var State = /*#__PURE__*/function () {
  function State(_ref) {
    var form = _ref.form,
        initial = _ref.initial,
        options = _ref.options,
        bindings = _ref.bindings;

    _classCallCheck(this, State);

    _defineProperty(this, "mode", 'mixed');

    _defineProperty(this, "strict", false);

    _defineProperty(this, "form", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "bindings", void 0);

    _defineProperty(this, "$extra", void 0);

    _defineProperty(this, "disposers", {
      interceptor: {},
      observer: {}
    });

    _defineProperty(this, "$struct", []);

    _defineProperty(this, "initial", {
      props: {},
      fields: {}
    });

    _defineProperty(this, "current", {
      props: {},
      fields: {}
    });

    this.set('form', form);
    this.initProps(initial);
    this.options = new _Options["default"]();
    this.options.set(options);
    this.bindings = new _Bindings["default"]();
    this.bindings.register(bindings);
    this.observeOptions();
  }

  _createClass(State, [{
    key: "initProps",
    value: function initProps(initial) {
      var initialProps = (0, _pick2["default"])(initial, [].concat(_toConsumableArray(_utils["default"].props.separated), _toConsumableArray(_utils["default"].props.validation), _toConsumableArray(_utils["default"].props["function"]), _toConsumableArray(_utils["default"].props.handlers)));
      this.set('initial', 'props', initialProps);

      var $unified = _utils["default"].hasUnifiedProps(initial);

      var $separated = _utils["default"].hasSeparatedProps(initial);

      if ($unified && $separated) {
        console.warn( // eslint-disable-line
        'WARNING: Your mobx-react-form instance ', this.form.name, ' is running in MIXED Mode (Unified + Separated) as fields properties definition.', 'This mode is experimental, use it at your own risk, or use only one mode.');
      }

      if (($separated || _utils["default"].isStruct(initial.fields)) && !$unified) {
        var struct = _utils["default"].$try(initial.struct || initial.fields);

        this.struct(struct);
        this.strict = true;
        this.mode = 'separated';
        return;
      }

      this.struct(initial.struct);
      this.mode = 'unified';
    }
    /**
      Get/Set Fields Structure
    */

  }, {
    key: "struct",
    value: function struct() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (data) this.$struct = data;
      return this.$struct;
    }
    /**
      Get Props/Fields
    */

  }, {
    key: "get",
    value: function get(type, subtype) {
      return this[type][subtype];
    }
    /**
      Set Props/Fields
    */

  }, {
    key: "set",
    value: function set(type, subtype) {
      var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (type === 'form') {
        // subtype is the form here
        this.form = subtype;
      }

      if (type === 'initial') {
        Object.assign(this.initial[subtype], state);
        Object.assign(this.current[subtype], state);
      }

      if (type === 'current') {
        Object.assign(this.current[subtype], state);
      }
    }
  }, {
    key: "extra",
    value: function extra() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if ((0, _isString2["default"])(data)) return (0, _get2["default"])(this.$extra, data);
      if (data === null) return this.$extra;
      this.$extra = data;
      return null;
    }
  }, {
    key: "observeOptions",
    value: function observeOptions() {
      var _this = this;

      // Fix Issue #201
      (0, _mobx.observe)(this.options.options, _utils["default"].checkObserve([{
        // start observing fields validateOnChange
        type: 'update',
        key: 'validateOnChange',
        to: true,
        exec: function exec() {
          return _this.form.each(function (field) {
            return field.observeValidationOnChange();
          });
        }
      }, {
        // stop observing fields validateOnChange
        type: 'update',
        key: 'validateOnChange',
        to: false,
        exec: function exec() {
          return _this.form.each(function (field) {
            return field.disposeValidationOnChange();
          });
        }
      }, {
        // start observing fields validateOnBlur
        type: 'update',
        key: 'validateOnBlur',
        to: true,
        exec: function exec() {
          return _this.form.each(function (field) {
            return field.observeValidationOnBlur();
          });
        }
      }, {
        // stop observing fields validateOnBlur
        type: 'update',
        key: 'validateOnBlur',
        to: false,
        exec: function exec() {
          return _this.form.each(function (field) {
            return field.disposeValidationOnBlur();
          });
        }
      }]));
    }
  }]);

  return State;
}();

exports["default"] = State;
module.exports = exports["default"];