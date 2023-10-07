"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
  YUP - Dead simple Object schema validation

    const plugins = {
      yup: $yup({
        package: yup,
        schema: (y) => (),
        extend,
      }),
    };

*/
var YUP = /*#__PURE__*/function () {
  function YUP(_ref) {
    var _ref$config = _ref.config,
        config = _ref$config === void 0 ? {} : _ref$config,
        _ref$state = _ref.state,
        state = _ref$state === void 0 ? {} : _ref$state,
        _ref$promises = _ref.promises,
        promises = _ref$promises === void 0 ? [] : _ref$promises;

    _classCallCheck(this, YUP);

    _defineProperty(this, "promises", []);

    _defineProperty(this, "config", null);

    _defineProperty(this, "state", null);

    _defineProperty(this, "extend", null);

    _defineProperty(this, "validator", null);

    _defineProperty(this, "schema", null);

    this.state = state;
    this.promises = promises;
    this.extend = config.extend;
    this.validator = config["package"] || config;
    this.schema = config.schema(this.validator);
    this.extendValidator();
  }

  _createClass(YUP, [{
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

      var $p = new Promise(function (resolve) {
        return _this.validator.reach(_this.schema, field.path).label(field.label).validate(field.validatedValue, {
          strict: true
        }).then(function () {
          return _this.handleAsyncPasses(field, resolve);
        })["catch"](function (error) {
          return _this.handleAsyncFails(field, resolve, error);
        });
      });
      this.promises.push($p);
    }
  }, {
    key: "handleAsyncPasses",
    value: function handleAsyncPasses(field, resolve) {
      field.setValidationAsyncData(true);
      field.showAsyncErrors();
      resolve();
    }
  }, {
    key: "handleAsyncFails",
    value: function handleAsyncFails(field, resolve, error) {
      field.setValidationAsyncData(false, error.errors[0]);
      this.executeAsyncValidation(field);
      field.showAsyncErrors();
      resolve();
    }
  }, {
    key: "executeAsyncValidation",
    value: function executeAsyncValidation(field) {
      if (field.validationAsyncData.valid === false) {
        field.invalidate(field.validationAsyncData.message, true);
      }
    }
  }]);

  return YUP;
}();

var _default = function _default(config) {
  return {
    "class": YUP,
    config: config
  };
};

exports["default"] = _default;
module.exports = exports["default"];