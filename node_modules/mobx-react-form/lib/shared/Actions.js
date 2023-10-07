"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _last2 = _interopRequireDefault(require("lodash/last"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _trim2 = _interopRequireDefault(require("lodash/trim"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isNull2 = _interopRequireDefault(require("lodash/isNull"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _max2 = _interopRequireDefault(require("lodash/max"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _trimStart2 = _interopRequireDefault(require("lodash/trimStart"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _each2 = _interopRequireDefault(require("lodash/each"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _transform2 = _interopRequireDefault(require("lodash/transform"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _mobx = require("mobx");

var _utils = _interopRequireDefault(require("../utils"));

var _parser = _interopRequireDefault(require("../parser"));

var _obj;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
  Field Actions
*/
var _default = (_obj = {
  validate: function validate() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var $opt = (0, _merge2["default"])(opt, {
      path: this.path
    });
    return this.state.form.validator.validate($opt, obj);
  },
  submit: function submit() {
    var _this = this;

    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.$submitting = true;
    this.$submitted += 1;

    var exec = function exec(isValid) {
      return isValid ? _this.execHook('onSuccess', o) : _this.execHook('onError', o);
    };

    var validate = function validate() {
      return _this.validate({
        showErrors: _this.state.options.get('showErrorsOnSubmit', _this)
      }).then(function (_ref) {
        var isValid = _ref.isValid;
        var handler = exec(isValid);
        if (isValid) return handler;

        var $err = _this.state.options.get('defaultGenericError', _this);

        var $throw = _this.state.options.get('submitThrowsError', _this);

        if ($throw && $err) _this.invalidate();
        return handler;
      }) // eslint-disable-next-line
      .then((0, _mobx.action)(function () {
        return _this.$submitting = false;
      }))["catch"]((0, _mobx.action)(function (err) {
        _this.$submitting = false;
        throw err;
      })).then(function () {
        return _this;
      });
    };

    return _utils["default"].isPromise(exec) ? exec.then(function () {
      return validate();
    }) : validate();
  },

  /**
   Check Field Computed Values
   */
  check: function check(prop) {
    var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _utils["default"].allowedProps('booleans', [prop]);

    return deep ? _utils["default"].checkPropType({
      type: _utils["default"].props.types[prop],
      data: this.deepCheck(_utils["default"].props.types[prop], prop, this.fields)
    }) : this[prop];
  },
  deepCheck: function deepCheck(type, prop, fields) {
    var _this2 = this;

    var $fields = _utils["default"].getObservableMapValues(fields);

    return (0, _transform2["default"])($fields, function (check, field) {
      if (!field.fields.size || _utils["default"].props.exceptions.includes(prop)) {
        check.push(field[prop]);
      }

      var $deep = _this2.deepCheck(type, prop, field.fields);

      check.push(_utils["default"].checkPropType({
        type: type,
        data: $deep
      }));
      return check;
    }, []);
  },

  /**
   Update Field Values recurisvely
   OR Create Field if 'undefined'
   */
  update: function update(fields) {
    if (!(0, _isPlainObject2["default"])(fields)) {
      throw new Error('The update() method accepts only plain objects.');
    }

    return this.deepUpdate(_parser["default"].prepareFieldsData({
      fields: fields
    }));
  },
  deepUpdate: function deepUpdate(fields) {
    var _this3 = this;

    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var recursion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    (0, _each2["default"])(fields, function (field, key) {
      var $key = (0, _has2["default"])(field, 'name') ? field.name : key;
      var $path = (0, _trimStart2["default"])("".concat(path, ".").concat($key), '.');

      var $field = _this3.select($path, null, false);

      var $container = _this3.select(path, null, false) || _this3.state.form.select(_this3.path, null, false);

      if (!(0, _isNil2["default"])($field) && !(0, _isUndefined2["default"])(field)) {
        if ((0, _isArray2["default"])($field.values())) {
          var n = (0, _max2["default"])((0, _map2["default"])(field.fields, function (f, i) {
            return Number(i);
          }));
          if (n === undefined) n = -1; // field's value is []

          (0, _each2["default"])(_utils["default"].getObservableMapValues($field.fields), function ($f) {
            if (Number($f.name) > n) $field.fields["delete"]($f.name);
          });
        }

        if ((0, _isNull2["default"])(field) || (0, _isNil2["default"])(field.fields)) {
          $field.$value = _parser["default"].parseInput($field.$input, {
            separated: field
          });
          return;
        }
      }

      if (!(0, _isNil2["default"])($container) && (0, _isNil2["default"])($field)) {
        // get full path when using update() with select() - FIX: #179
        var $newFieldPath = (0, _trimStart2["default"])([_this3.path, $path].join('.'), '.'); // init field into the container field

        $container.initField($key, $newFieldPath, field, true);
      } else if (recursion) {
        if ((0, _has2["default"])(field, 'fields') && !(0, _isNil2["default"])(field.fields)) {
          // handle nested fields if defined
          _this3.deepUpdate(field.fields, $path);
        } else {
          // handle nested fields if undefined or null
          var $fields = _parser["default"].pathToFieldsTree(_this3.state.struct(), $path);

          _this3.deepUpdate($fields, $path, false);
        }
      }
    });
  },

  /**
    Get Fields Props
   */
  get: function get() {
    var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if ((0, _isNil2["default"])(prop)) {
      return this.deepGet([].concat(_toConsumableArray(_utils["default"].props.booleans), _toConsumableArray(_utils["default"].props.field), _toConsumableArray(_utils["default"].props.validation)), this.fields);
    }

    _utils["default"].allowedProps('all', (0, _isArray2["default"])(prop) ? prop : [prop]);

    if ((0, _isString2["default"])(prop)) {
      if (strict && this.fields.size === 0) {
        return _parser["default"].parseCheckOutput(this, prop);
      }

      var value = this.deepGet(prop, this.fields);
      return _parser["default"].parseCheckArray(this, value, prop);
    }

    return this.deepGet(prop, this.fields);
  },

  /**
    Get Fields Props Recursively
   */
  deepGet: function deepGet(prop, fields) {
    var _this4 = this;

    return (0, _transform2["default"])(_utils["default"].getObservableMapValues(fields), function (obj, field) {
      var $nested = function $nested($fields) {
        return $fields.size !== 0 ? _this4.deepGet(prop, $fields) : undefined;
      };

      Object.assign(obj, _defineProperty({}, field.key, {
        fields: $nested(field.fields)
      }));

      if ((0, _isString2["default"])(prop)) {
        var removeValue = prop === 'value' && (_this4.state.options.get('retrieveOnlyDirtyValues', _this4) && field.isPristine || _this4.state.options.get('retrieveOnlyEnabledFields', _this4) && field.disabled || _this4.state.options.get('softDelete', _this4) && field.deleted);

        if (field.fields.size === 0) {
          delete obj[field.key]; // eslint-disable-line

          if (removeValue) return obj;
          return Object.assign(obj, _defineProperty({}, field.key, _parser["default"].parseCheckOutput(field, prop)));
        }

        var value = _this4.deepGet(prop, field.fields);

        if (prop === 'value') value = field.$output(value);
        delete obj[field.key]; // eslint-disable-line

        if (removeValue) return obj;
        return Object.assign(obj, _defineProperty({}, field.key, _parser["default"].parseCheckArray(field, value, prop)));
      }

      (0, _each2["default"])(prop, function ($prop) {
        return Object.assign(obj[field.key], _defineProperty({}, $prop, field[$prop]));
      });
      return obj;
    }, {});
  },
  set: function set(prop, data) {
    // UPDATE CUSTOM PROP
    if ((0, _isString2["default"])(prop) && !(0, _isUndefined2["default"])(data)) {
      _utils["default"].allowedProps('field', [prop]);

      var deep = (0, _isObject2["default"])(data) && prop === 'value' || (0, _isPlainObject2["default"])(data);
      if (deep && this.hasNestedFields) this.deepSet(prop, data, '', true);else (0, _set2["default"])(this, "$".concat(prop), data);
      return;
    } // NO PROP NAME PROVIDED ("prop" is value)


    if ((0, _isNil2["default"])(data)) {
      if (this.hasNestedFields) this.deepSet('value', prop, '', true);else this.set('value', prop);
    }
  },

  /**
    Set Fields Props Recursively
   */
  deepSet: function deepSet($, data) {
    var _this5 = this;

    var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var recursion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var err = 'You are updating a not existent field:';
    var isStrict = this.state.options.get('strictUpdate', this);

    if ((0, _isNil2["default"])(data)) {
      this.each(function (field) {
        return field.clear(true);
      });
      return;
    }

    (0, _each2["default"])(data, function ($val, $key) {
      var $path = (0, _trimStart2["default"])("".concat(path, ".").concat($key), '.'); // get the field by path joining keys recursively

      var field = _this5.select($path, null, isStrict); // if no field found when is strict update, throw error


      if (isStrict) _utils["default"].throwError($path, field, err); // update the field/fields if defined

      if (!(0, _isUndefined2["default"])(field)) {
        // update field values or others props
        if (!(0, _isUndefined2["default"])($val)) {
          field.set($, $val, recursion);
        } // update values recursively only if field has nested


        if (field.fields.size && (0, _isObject2["default"])($val)) {
          _this5.deepSet($, $val, $path, recursion);
        }
      }
    });
  },
  add: function add(obj) {
    var _this6 = this;

    if (_utils["default"].isArrayOfObjects(obj)) {
      return (0, _each2["default"])(obj, function (values) {
        return _this6.update(_defineProperty({}, _utils["default"].maxKey(_this6.fields), values));
      });
    }

    var key; // eslint-disable-next-line

    if ((0, _has2["default"])(obj, 'key')) key = obj.key;
    if ((0, _has2["default"])(obj, 'name')) key = obj.name;
    if (!key) key = _utils["default"].maxKey(this.fields);

    var $path = function $path($key) {
      return (0, _trimStart2["default"])([_this6.path, $key].join('.'), '.');
    };

    var tree = _parser["default"].pathToFieldsTree(this.state.struct(), this.path, 0, true);

    return this.initField(key, $path(key), (0, _merge2["default"])(tree[0], obj));
  },
  del: function del() {
    var $path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var isStrict = this.state.options.get('strictDelete', this);

    var path = _parser["default"].parsePath(_utils["default"].$try($path, this.path));

    var fullpath = (0, _trim2["default"])([this.path, path].join('.'), '.');
    var container = this.container($path);
    var keys = (0, _split2["default"])(path, '.');
    var last = (0, _last2["default"])(keys);

    if (isStrict && !container.fields.has(last)) {
      var msg = "Key \"".concat(last, "\" not found when trying to delete field");

      _utils["default"].throwError(fullpath, null, msg);
    }

    if (this.state.options.get('softDelete', this)) {
      return this.select(fullpath).set('deleted', true);
    }

    return container.fields["delete"](last);
  }
}, (_applyDecoratedDescriptor(_obj, "submit", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "submit"), _obj), _applyDecoratedDescriptor(_obj, "deepUpdate", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "deepUpdate"), _obj), _applyDecoratedDescriptor(_obj, "set", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "set"), _obj), _applyDecoratedDescriptor(_obj, "add", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "add"), _obj), _applyDecoratedDescriptor(_obj, "del", [_mobx.action], Object.getOwnPropertyDescriptor(_obj, "del"), _obj)), _obj);

exports["default"] = _default;
module.exports = exports["default"];