"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isNaN2 = _interopRequireDefault(require("lodash/isNaN"));

var _isNull2 = _interopRequireDefault(require("lodash/isNull"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _omitBy2 = _interopRequireDefault(require("lodash/omitBy"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _trim2 = _interopRequireDefault(require("lodash/trim"));

var _trimStart2 = _interopRequireDefault(require("lodash/trimStart"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _get2 = _interopRequireDefault(require("lodash/get"));

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
  Schema Validation Keywords

    const plugins = {
      svk: svk({
        package: ajv,
        extend: callback,
      }),
    };

*/


var SVK = /*#__PURE__*/function () {
  function SVK(_ref) {
    var _ref$config = _ref.config,
        config = _ref$config === void 0 ? {} : _ref$config,
        _ref$state = _ref.state,
        state = _ref$state === void 0 ? {} : _ref$state,
        _ref$promises = _ref.promises,
        promises = _ref$promises === void 0 ? [] : _ref$promises;

    _classCallCheck(this, SVK);

    _defineProperty(this, "promises", []);

    _defineProperty(this, "config", null);

    _defineProperty(this, "state", null);

    _defineProperty(this, "extend", null);

    _defineProperty(this, "validator", null);

    _defineProperty(this, "schema", null);

    this.state = state;
    this.promises = promises;
    this.extend = config.extend;
    this.schema = config.schema;
    this.initAJV(config);
  }

  _createClass(SVK, [{
    key: "extendOptions",
    value: function extendOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.assign(options, {
        allowRequired: (0, _get2["default"])(options, 'allowRequired') || false,
        errorDataPath: 'property',
        allErrors: true,
        coerceTypes: true,
        v5: true
      });
    }
  }, {
    key: "initAJV",
    value: function initAJV(config, form) {
      // get ajv package
      var ajv = config["package"] || config; // create ajv instance

      var validator = new ajv(this.extendOptions(config.options)); // extend ajv using "extend" callback

      if ((0, _isFunction2["default"])(this.extend)) {
        this.extend({
          form: this.state.form,
          validator: validator
        });
      } // create ajv validator (compiling rules)


      this.validator = validator.compile(this.schema);
    }
  }, {
    key: "validateField",
    value: function validateField(field) {
      var _this = this;

      var data = _defineProperty({}, field.path, field.validatedValue);

      var validate = this.validator(this.parseValues(data)); // check if is $async schema

      if (isPromise(validate)) {
        var $p = validate.then(function () {
          return field.setValidationAsyncData(true);
        })["catch"](function (err) {
          return err && _this.handleAsyncError(field, err.errors);
        }).then(function () {
          return _this.executeAsyncValidation(field);
        }).then(function () {
          return field.showAsyncErrors();
        }); // push the promise into array

        this.promises.push($p);
        return;
      } // check sync errors


      this.handleSyncError(field, this.validator.errors);
    }
  }, {
    key: "handleSyncError",
    value: function handleSyncError(field, errors) {
      var fieldErrorObj = this.findError(field.key, errors); // if fieldErrorObj is not undefined, the current field is invalid.

      if ((0, _isUndefined2["default"])(fieldErrorObj)) return; // the current field is now invalid
      // add additional info to the message

      var msg = "".concat(field.label, " ").concat(fieldErrorObj.message); // invalidate the current field with message

      field.invalidate(msg);
    }
  }, {
    key: "handleAsyncError",
    value: function handleAsyncError(field, errors) {
      // find current field error message from ajv errors
      var fieldErrorObj = this.findError(field.path, errors); // if fieldErrorObj is not undefined, the current field is invalid.

      if ((0, _isUndefined2["default"])(fieldErrorObj)) return; // the current field is now invalid
      // add additional info to the message

      var msg = "".concat(field.label, " ").concat(fieldErrorObj.message); // set async validation data on the field

      field.setValidationAsyncData(false, msg);
    }
  }, {
    key: "findError",
    value: function findError(path, errors) {
      return (0, _find2["default"])(errors, function (_ref2) {
        var dataPath = _ref2.dataPath;
        var $dataPath;
        $dataPath = (0, _trimStart2["default"])(dataPath, '.');
        $dataPath = (0, _trim2["default"])($dataPath, '[\'');
        $dataPath = (0, _trim2["default"])($dataPath, '\']');
        return (0, _includes2["default"])($dataPath, "".concat(path));
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
    key: "parseValues",
    value: function parseValues(values) {
      if ((0, _get2["default"])(this.config, 'options.allowRequired') === true) {
        return (0, _omitBy2["default"])(values, _isEmpty2["default"] || _isNull2["default"] || _isUndefined2["default"] || _isNaN2["default"]);
      }

      return values;
    }
  }]);

  return SVK;
}();

var _default = function _default(config) {
  return {
    "class": SVK,
    config: config
  };
};

exports["default"] = _default;
module.exports = exports["default"];