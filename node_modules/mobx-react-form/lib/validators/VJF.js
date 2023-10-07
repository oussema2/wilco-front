"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _mobx = require("mobx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isPromise = function isPromise(obj) {
  return !!obj && typeof obj.then === 'function' && (_typeof(obj) === 'object' || typeof obj === 'function');
};
/**
  Vanilla JavaScript Functions

    const plugins = {
      vkf: vkf({
        package: validator,
      }),
    };

*/


var VJF = /*#__PURE__*/function () {
  function VJF(_ref) {
    var _ref$config = _ref.config,
        config = _ref$config === void 0 ? {} : _ref$config,
        _ref$state = _ref.state,
        state = _ref$state === void 0 ? {} : _ref$state,
        _ref$promises = _ref.promises,
        promises = _ref$promises === void 0 ? [] : _ref$promises;

    _classCallCheck(this, VJF);

    _defineProperty(this, "promises", []);

    _defineProperty(this, "config", null);

    _defineProperty(this, "state", null);

    _defineProperty(this, "extend", null);

    _defineProperty(this, "validator", null);

    this.state = state;
    this.promises = promises;
    this.extend = config.extend;
    this.validator = config["package"] || config;
    this.extendValidator();
  }

  _createClass(VJF, [{
    key: "extendValidator",
    value: function extendValidator() {
      // extend using "extend" callback
      if ((0, _isFunction2["default"])(this.extend)) {
        this.extend({
          validator: this.validator,
          form: this.state.form
        });
      }
    }
  }, {
    key: "validateField",
    value: function validateField(field) {
      var _this = this;

      // exit if field does not have validation functions
      if (!field.validators) return; // get validators from validate property

      var $fn = (0, _mobx.toJS)(field.validators); // map only if is an array of validator functions

      if ((0, _isArray2["default"])($fn)) {
        $fn.map(function (fn) {
          return _this.collectData(fn, field);
        });
      } // it's just one function


      if ((0, _isFunction2["default"])($fn)) {
        this.collectData($fn, field);
      } // execute the validation function


      this.executeValidation(field);
    }
  }, {
    key: "collectData",
    value: function collectData($fn, field) {
      var _this2 = this;

      var res = this.handleFunctionResult($fn, field); // check and execute only if is a promise

      if (isPromise(res)) {
        var $p = res.then(function ($res) {
          return field.setValidationAsyncData($res[0], $res[1]);
        }).then(function () {
          return _this2.executeAsyncValidation(field);
        }).then(function () {
          return field.showAsyncErrors();
        }); // push the promise into array

        this.promises.push($p);
        return;
      } // is a plain function


      field.validationFunctionsData.unshift({
        valid: res[0],
        message: res[1]
      });
    }
  }, {
    key: "executeValidation",
    value: function executeValidation(field) {
      // otherwise find an error message to show
      field.validationFunctionsData.map(function (rule) {
        return rule.valid === false && field.invalidate(rule.message);
      });
    }
  }, {
    key: "executeAsyncValidation",
    value: function executeAsyncValidation(field) {
      if (field.validationAsyncData.valid === false) {
        field.invalidate(field.validationAsyncData.message, true);
      }
    }
  }, {
    key: "handleFunctionResult",
    value: function handleFunctionResult($fn, field) {
      // executre validation function
      var res = $fn({
        validator: this.validator,
        form: this.state.form,
        field: field
      });
      /**
        Handle "array"
      */

      if ((0, _isArray2["default"])(res)) {
        var isValid = res[0] || false;
        var message = res[1] || 'Error';
        return [isValid, message];
      }
      /**
        Handle "boolean"
      */


      if ((0, _isBoolean2["default"])(res)) {
        return [res, 'Error'];
      }
      /**
        Handle "string"
      */


      if ((0, _isString2["default"])(res)) {
        return [false, res];
      }
      /**
        Handle "object / promise"
      */


      if (isPromise(res)) {
        return res; // the promise
      }
      /**
        Handle other cases
      */


      return [false, 'Error'];
    }
  }]);

  return VJF;
}();

var _default = function _default(config) {
  return {
    "class": VJF,
    config: config
  };
};

exports["default"] = _default;
module.exports = exports["default"];