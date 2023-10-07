"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _has2 = _interopRequireDefault(require("lodash/has"));

var _mobx = require("mobx");

var _utils = require("./utils");

var _class, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Options = (_class = (_temp = /*#__PURE__*/function () {
  function Options() {
    _classCallCheck(this, Options);

    _initializerDefineProperty(this, "options", _descriptor, this);

    (0, _mobx.makeObservable)(this);
  }

  _createClass(Options, [{
    key: "get",
    value: function get() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      // handle field option
      if ((0, _has2["default"])(field, 'path')) {
        if ((0, _has2["default"])(field.$options, key)) {
          return field.$options[key];
        }
      } // fallback on global form options


      if (key) return this.options[key];
      return (0, _mobx.toJS)(this.options);
    }
  }, {
    key: "set",
    value: function set(options) {
      if (_mobx.set) {
        (0, _mobx.set)(this.options, options);
      } else {
        (0, _mobx.extendObservable)(this.options, options);
      }
    }
  }]);

  return Options;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "options", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      uniqueId: _utils.uniqueId,
      fallback: true,
      defaultGenericError: null,
      submitThrowsError: true,
      showErrorsOnInit: false,
      showErrorsOnSubmit: true,
      showErrorsOnBlur: true,
      showErrorsOnChange: true,
      showErrorsOnClear: false,
      showErrorsOnReset: true,
      validateOnInit: true,
      validateOnBlur: true,
      validateOnChange: false,
      validateOnChangeAfterInitialBlur: false,
      validateOnChangeAfterSubmit: false,
      validateDisabledFields: false,
      validateDeletedFields: false,
      validatePristineFields: true,
      strictUpdate: false,
      strictDelete: true,
      softDelete: false,
      retrieveOnlyDirtyValues: false,
      retrieveOnlyEnabledFields: false,
      autoParseNumbers: false,
      validationDebounceWait: 250,
      validationDebounceOptions: {
        leading: false,
        trailing: true
      }
    };
  }
}), _applyDecoratedDescriptor(_class.prototype, "set", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "set"), _class.prototype)), _class);
exports["default"] = Options;
module.exports = exports["default"];