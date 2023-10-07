"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _uniqueId2 = _interopRequireDefault(require("lodash/uniqueId"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _max2 = _interopRequireDefault(require("lodash/max"));

var _isInteger2 = _interopRequireDefault(require("lodash/isInteger"));

var _toNumber2 = _interopRequireDefault(require("lodash/toNumber"));

var _ary2 = _interopRequireDefault(require("lodash/ary"));

var _isDate2 = _interopRequireDefault(require("lodash/isDate"));

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

var _keys2 = _interopRequireDefault(require("lodash/keys"));

var _values2 = _interopRequireDefault(require("lodash/values"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _union2 = _interopRequireDefault(require("lodash/union"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _partial2 = _interopRequireDefault(require("lodash/partial"));

var _trim2 = _interopRequireDefault(require("lodash/trim"));

var _replace2 = _interopRequireDefault(require("lodash/replace"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _intersection2 = _interopRequireDefault(require("lodash/intersection"));

var _every2 = _interopRequireDefault(require("lodash/every"));

var _some2 = _interopRequireDefault(require("lodash/some"));

var _mobx = require("mobx");

var _props = _interopRequireDefault(require("./props"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getObservableMapValues = function getObservableMapValues(observableMap) {
  return _mobx.values ? (0, _mobx.values)(observableMap) : observableMap.values();
};

var getObservableMapKeys = function getObservableMapKeys(observableMap) {
  return _mobx.values ? (0, _mobx.keys)(observableMap) : observableMap.keys();
};

var checkObserveItem = function checkObserveItem(change) {
  return function (_ref) {
    var key = _ref.key,
        to = _ref.to,
        type = _ref.type,
        exec = _ref.exec;
    return change.type === type && change.name === key && change.newValue === to && exec.apply(change, [change]);
  };
};

var checkObserve = function checkObserve(collection) {
  return function (change) {
    return collection.map(checkObserveItem(change));
  };
};

var checkPropType = function checkPropType(_ref2) {
  var type = _ref2.type,
      data = _ref2.data;
  var $check;

  switch (type) {
    case 'some':
      $check = function $check($data) {
        return (0, _some2["default"])($data, Boolean);
      };

      break;

    case 'every':
      $check = function $check($data) {
        return (0, _every2["default"])($data, Boolean);
      };

      break;

    default:
      $check = null;
  }

  return $check(data);
};

var hasProps = function hasProps($type, $data) {
  var $props;

  switch ($type) {
    case 'booleans':
      $props = _props["default"].booleans;
      break;

    case 'field':
      $props = [].concat(_toConsumableArray(_props["default"].field), _toConsumableArray(_props["default"].validation), _toConsumableArray(_props["default"]["function"]), _toConsumableArray(_props["default"].handlers));
      break;

    case 'all':
      $props = ['id'].concat(_toConsumableArray(_props["default"].booleans), _toConsumableArray(_props["default"].field), _toConsumableArray(_props["default"].validation), _toConsumableArray(_props["default"]["function"]), _toConsumableArray(_props["default"].handlers));
      break;

    default:
      $props = null;
  }

  return (0, _intersection2["default"])($data, $props).length > 0;
};
/**
  Check Allowed Properties
*/


var allowedProps = function allowedProps(type, data) {
  if (hasProps(type, data)) return;
  var $msg = 'The selected property is not allowed';
  throw new Error("".concat($msg, " (").concat(JSON.stringify(data), ")"));
};
/**
  Throw Error if undefined Fields
*/


var throwError = function throwError(path, fields) {
  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (!(0, _isNil2["default"])(fields)) return;
  var $msg = (0, _isNil2["default"])(msg) ? 'The selected field is not defined' : msg;
  throw new Error("".concat($msg, " (").concat(path, ")"));
};

var pathToStruct = function pathToStruct(path) {
  var struct;
  struct = (0, _replace2["default"])(path, new RegExp('[.]\\d+($|.)', 'g'), '[].');
  struct = (0, _replace2["default"])(struct, '..', '.');
  struct = (0, _trim2["default"])(struct, '.');
  return struct;
};

var hasSome = function hasSome(obj, keys) {
  return (0, _some2["default"])(keys, (0, _partial2["default"])(_has2["default"], obj));
};

var isPromise = function isPromise(obj) {
  return !!obj && typeof obj.then === 'function' && (_typeof(obj) === 'object' || typeof obj === 'function');
};

var isStruct = function isStruct(struct) {
  return (0, _isArray2["default"])(struct) && (0, _every2["default"])(struct, _isString2["default"]);
};

var isEmptyArray = function isEmptyArray(field) {
  return (0, _isEmpty2["default"])(field) && (0, _isArray2["default"])(field);
};

var isArrayOfObjects = function isArrayOfObjects(fields) {
  return (0, _isArray2["default"])(fields) && (0, _every2["default"])(fields, _isPlainObject2["default"]);
};

var $getKeys = function $getKeys(fields) {
  return (0, _union2["default"])((0, _map2["default"])((0, _values2["default"])(fields), function (values) {
    return (0, _keys2["default"])(values);
  })[0]);
};

var hasUnifiedProps = function hasUnifiedProps(_ref3) {
  var fields = _ref3.fields;
  return !isStruct({
    fields: fields
  }) && hasProps('field', $getKeys(fields));
};

var hasSeparatedProps = function hasSeparatedProps(initial) {
  return hasSome(initial, _props["default"].separated) || hasSome(initial, _props["default"].validation);
};

var allowNested = function allowNested(field, strictProps) {
  return (0, _isObject2["default"])(field) && !(0, _isDate2["default"])(field) && !(0, _has2["default"])(field, 'fields') && (!hasSome(field, [].concat(_toConsumableArray(_props["default"].field), _toConsumableArray(_props["default"].validation), _toConsumableArray(_props["default"]["function"]), _toConsumableArray(_props["default"].handlers))) || strictProps);
};

var parseIntKeys = function parseIntKeys(fields) {
  return (0, _map2["default"])(getObservableMapKeys(fields), (0, _ary2["default"])(_toNumber2["default"], 1));
};

var hasIntKeys = function hasIntKeys(fields) {
  return (0, _every2["default"])(parseIntKeys(fields), _isInteger2["default"]);
};

var maxKey = function maxKey(fields) {
  var max = (0, _max2["default"])(parseIntKeys(fields));
  return (0, _isUndefined2["default"])(max) ? 0 : max + 1;
};

var uniqueId = function uniqueId(field) {
  return (0, _uniqueId2["default"])([(0, _replace2["default"])(field.path, new RegExp('\\.', 'g'), '-'), '--'].join(''));
};

var $isEvent = function $isEvent(obj) {
  if ((0, _isNil2["default"])(obj) || typeof Event === 'undefined') return false;
  return obj instanceof Event || !(0, _isNil2["default"])(obj.target); // eslint-disable-line
};

var $hasFiles = function $hasFiles($) {
  return $.target.files && $.target.files.length !== 0;
};

var $isBool = function $isBool($, val) {
  return (0, _isBoolean2["default"])(val) && (0, _isBoolean2["default"])($.target.checked);
};

var $try = function $try() {
  var found = null;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.map(function (val) {
    return (// eslint-disable-line
      found === null && !(0, _isNil2["default"])(val) && (found = val)
    );
  });
  return found;
};

var _default = {
  props: _props["default"],
  checkObserve: checkObserve,
  checkPropType: checkPropType,
  hasProps: hasProps,
  allowedProps: allowedProps,
  throwError: throwError,
  isPromise: isPromise,
  isStruct: isStruct,
  isEmptyArray: isEmptyArray,
  isArrayOfObjects: isArrayOfObjects,
  pathToStruct: pathToStruct,
  hasUnifiedProps: hasUnifiedProps,
  hasSeparatedProps: hasSeparatedProps,
  allowNested: allowNested,
  parseIntKeys: parseIntKeys,
  hasIntKeys: hasIntKeys,
  maxKey: maxKey,
  uniqueId: uniqueId,
  $isEvent: $isEvent,
  $hasFiles: $hasFiles,
  $isBool: $isBool,
  $try: $try,
  getObservableMapKeys: getObservableMapKeys,
  getObservableMapValues: getObservableMapValues
};
exports["default"] = _default;
module.exports = exports["default"];