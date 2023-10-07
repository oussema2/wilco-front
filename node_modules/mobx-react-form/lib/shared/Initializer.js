"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _forIn2 = _interopRequireDefault(require("lodash/forIn"));

var _trimStart2 = _interopRequireDefault(require("lodash/trimStart"));

var _mobx = require("mobx");

var _utils = _interopRequireDefault(require("../utils"));

var _parser = _interopRequireDefault(require("../parser"));

var _obj;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
  Field Initializer
*/
var _default = (_obj = {
  initFields: function initFields(initial, update) {
    var _this = this;

    var fallback = this.state.options.get('fallback');

    var $path = function $path(key) {
      return (0, _trimStart2["default"])([_this.path, key].join('.'), '.');
    };

    var fields;
    fields = _parser["default"].prepareFieldsData(initial, this.state.strict, fallback);
    fields = _parser["default"].mergeSchemaDefaults(fields, this.validator); // create fields

    (0, _forIn2["default"])(fields, function (field, key) {
      var path = $path(key);

      var $f = _this.select(path, null, false);

      if ((0, _isNil2["default"])($f)) {
        if (fallback) {
          _this.initField(key, path, field, update);
        } else {
          var structPath = _utils["default"].pathToStruct(path);

          var struct = _this.state.struct();

          var found = struct.filter(function (s) {
            return s.startsWith(structPath);
          }).find(function (s) {
            return s.charAt(structPath.length) === '.' || s.substr(structPath.length, 2) === '[]' || s === structPath;
          });
          if (found) _this.initField(key, path, field, update);
        }
      }
    });
  },
  initField: function initField(key, path, data) {
    var update = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var initial = this.state.get('current', 'props');

    var struct = _utils["default"].pathToStruct(path); // try to get props from separated objects


    var $try = function $try(prop) {
      var t = (0, _get2["default"])(initial[prop], struct);
      if ((prop === 'input' || prop === 'output') && typeof t !== 'function') return undefined;
      return t;
    };

    var props = {
      $value: (0, _get2["default"])(initial['values'], path),
      $label: $try('labels'),
      $placeholder: $try('placeholders'),
      $default: $try('defaults'),
      $initial: $try('initials'),
      $disabled: $try('disabled'),
      $bindings: $try('bindings'),
      $type: $try('types'),
      $options: $try('options'),
      $extra: $try('extra'),
      $related: $try('related'),
      $hooks: $try('hooks'),
      $handlers: $try('handlers'),
      $validatedWith: $try('validatedWith'),
      $validators: $try('validators'),
      $rules: $try('rules'),
      $observers: $try('observers'),
      $interceptors: $try('interceptors'),
      $input: $try('input'),
      $output: $try('output')
    };
    var field = this.state.form.makeField({
      key: key,
      path: path,
      data: data,
      props: props,
      update: update,
      state: this.state
    });
    this.fields.merge(_defineProperty({}, key, field));
    return field;
  }
}, (_applyDecoratedDescriptor(_obj, "initField", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "initField"), _obj)), _obj);

exports["default"] = _default;
module.exports = exports["default"];