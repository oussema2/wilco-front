"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _each2 = _interopRequireDefault(require("lodash/each"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _transform2 = _interopRequireDefault(require("lodash/transform"));

var _last2 = _interopRequireDefault(require("lodash/last"));

var _trimEnd2 = _interopRequireDefault(require("lodash/trimEnd"));

var _endsWith2 = _interopRequireDefault(require("lodash/endsWith"));

var _reduceRight2 = _interopRequireDefault(require("lodash/reduceRight"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _values2 = _interopRequireDefault(require("lodash/values"));

var _replace2 = _interopRequireDefault(require("lodash/replace"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _isDate2 = _interopRequireDefault(require("lodash/isDate"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultClearValue = function defaultClearValue(_ref) {
  var value = _ref.value;
  if ((0, _isArray2["default"])(value)) return [];
  if ((0, _isDate2["default"])(value)) return null;
  if ((0, _isBoolean2["default"])(value)) return false;
  if ((0, _isNumber2["default"])(value)) return 0;
  if ((0, _isString2["default"])(value)) return '';
  return undefined;
};

var defaultValue = function defaultValue(_ref2) {
  var type = _ref2.type,
      _ref2$nullable = _ref2.nullable,
      nullable = _ref2$nullable === void 0 ? false : _ref2$nullable,
      _ref2$isEmptyArray = _ref2.isEmptyArray,
      isEmptyArray = _ref2$isEmptyArray === void 0 ? false : _ref2$isEmptyArray;
  if (type === 'date') return null;
  if (type === 'datetime-local') return null;
  if (type === 'checkbox') return false;
  if (type === 'number') return 0;
  if (nullable) return null;
  if (isEmptyArray) return [];
  return '';
};

var parsePath = function parsePath(path) {
  var $path = path;
  $path = (0, _replace2["default"])($path, new RegExp('\\[', 'g'), '.');
  $path = (0, _replace2["default"])($path, new RegExp('\\]', 'g'), '');
  return $path;
};

var parseInput = function parseInput(input, _ref3) {
  var type = _ref3.type,
      isEmptyArray = _ref3.isEmptyArray,
      nullable = _ref3.nullable,
      separated = _ref3.separated,
      unified = _ref3.unified,
      fallback = _ref3.fallback;
  return input(_utils["default"].$try(separated, unified, fallback, defaultValue({
    type: type,
    isEmptyArray: isEmptyArray,
    nullable: nullable
  })));
};

var parseArrayProp = function parseArrayProp($val, $prop) {
  var $values = (0, _values2["default"])($val);

  if ($prop === 'value' || $prop === 'initial' || $prop === 'default') {
    return (0, _without2["default"])($values, null, undefined, '');
  }

  return $values;
};

var parseCheckArray = function parseCheckArray(field, value, prop) {
  return field.hasIncrementalKeys ? parseArrayProp(value, prop) : value;
};

var parseCheckOutput = function parseCheckOutput($field, $prop) {
  return $prop === 'value' && $field.$output ? $field.$output($field[$prop]) : $field[$prop];
};

var defineFieldsFromStruct = function defineFieldsFromStruct(struct) {
  var add = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (0, _reduceRight2["default"])(struct, function ($, name) {
    var obj = {};

    if ((0, _endsWith2["default"])(name, '[]')) {
      var val = add ? [$] : [];
      obj[(0, _trimEnd2["default"])(name, '[]')] = val;
      return obj;
    } // no brakets


    var prev = struct[struct.indexOf(name) - 1];
    var stop = (0, _endsWith2["default"])(prev, '[]') && (0, _last2["default"])(struct) === name;
    if (!add && stop) return obj;
    obj[name] = $;
    return obj;
  }, {});
};

var handleFieldsArrayOfStrings = function handleFieldsArrayOfStrings($fields) {
  var add = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var fields = $fields; // handle array with field struct (strings)

  if (_utils["default"].isStruct(fields)) {
    fields = (0, _transform2["default"])(fields, function ($obj, $) {
      var pathStruct = (0, _split2["default"])($, '.'); // as array of strings (with empty values)

      if (!pathStruct.length) return Object.assign($obj, _defineProperty({}, $, '')); // define flat or nested fields from pathStruct

      return (0, _merge2["default"])($obj, defineFieldsFromStruct(pathStruct, add));
    }, {});
  }

  return fields;
};

var handleFieldsArrayOfObjects = function handleFieldsArrayOfObjects($fields) {
  var fields = $fields; // handle array of objects (with unified props)

  if (_utils["default"].isArrayOfObjects(fields)) {
    fields = (0, _transform2["default"])(fields, function ($obj, field) {
      if (_utils["default"].hasUnifiedProps({
        fields: {
          field: field
        }
      }) && !(0, _has2["default"])(field, 'name')) return undefined;
      return Object.assign($obj, _defineProperty({}, field.name, field));
    }, {});
  }

  return fields;
};

var handleFieldsNested = function handleFieldsNested(fields) {
  var strictProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return (0, _transform2["default"])(fields, function (obj, field, key) {
    if (_utils["default"].allowNested(field, strictProps)) {
      // define nested field
      return Object.assign(obj, _defineProperty({}, key, {
        fields: _utils["default"].isEmptyArray(field) ? [] : handleFieldsNested(field)
      }));
    }

    return Object.assign(obj, _defineProperty({}, key, field));
  }, {});
};
/* mapNestedValuesToUnifiedValues

FROM:

{
  street: '123 Fake St.',
  zip: '12345',
}

TO:

[{
  name: 'street'
  value: '123 Fake St.',
}, {
  name: 'zip'
  value: '12345',
}]

*/


var mapNestedValuesToUnifiedValues = function mapNestedValuesToUnifiedValues(data) {
  return (0, _isPlainObject2["default"])(data) ? (0, _map2["default"])(data, function (value, name) {
    return {
      value: value,
      name: name
    };
  }) : undefined;
};
/* reduceValuesToUnifiedFields

FROM:

{
  name: 'fatty',
  address: {
    street: '123 Fake St.',
    zip: '12345',
  },
};

TO:

{
  name: {
    value: 'fatty',
    fields: undefined
  },
  address: {
    value: {
      street: '123 Fake St.',
      zip: '12345'
    },
    fields: [ ... ]
  },
};

*/


var reduceValuesToUnifiedFields = function reduceValuesToUnifiedFields(values) {
  return (0, _transform2["default"])(values, function (obj, value, key) {
    return Object.assign(obj, _defineProperty({}, key, {
      value: value,
      fields: mapNestedValuesToUnifiedValues(value)
    }));
  }, {});
};
/*
  Fallback Unified Props to Sepated Mode
*/


var handleFieldsPropsFallback = function handleFieldsPropsFallback(fields, initial, fallback) {
  if (!(0, _has2["default"])(initial, 'values')) return fields; // if the 'values' object is passed in constructor
  // then update the fields definitions

  var values = initial.values;

  if (_utils["default"].hasUnifiedProps({
    fields: fields
  })) {
    values = reduceValuesToUnifiedFields(values);
  }

  return (0, _merge2["default"])(fields, (0, _transform2["default"])(values, function (result, v, k) {
    if ((0, _isArray2["default"])(fields[k])) result[k] = v;
    if (!(k in fields) && (!isNaN(Number(k)) || fallback)) result[k] = v;
  }, {}));
};

var mergeSchemaDefaults = function mergeSchemaDefaults(fields, validator) {
  if (validator) {
    var schema = (0, _get2["default"])(validator.plugins, 'svk.config.schema');

    if ((0, _isEmpty2["default"])(fields) && schema && !!schema.properties) {
      (0, _each2["default"])(schema.properties, function (prop, key) {
        (0, _set2["default"])(fields, key, {
          value: prop["default"],
          label: prop.title
        });
      });
    }
  }

  return fields;
};

var prepareFieldsData = function prepareFieldsData(initial) {
  var strictProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var fields = (0, _merge2["default"])(handleFieldsArrayOfStrings(initial.fields, false), handleFieldsArrayOfStrings(initial.struct, false));
  fields = handleFieldsArrayOfObjects(fields);
  fields = handleFieldsPropsFallback(fields, initial, fallback);
  fields = handleFieldsNested(fields, strictProps);
  return fields;
};

var pathToFieldsTree = function pathToFieldsTree(struct, path) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var add = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var structPath = _utils["default"].pathToStruct(path);

  var structArray = (0, _filter2["default"])(struct, function (item) {
    return (0, _startsWith2["default"])(item, structPath);
  });
  var $tree = handleFieldsArrayOfStrings(structArray, add);
  var $struct = (0, _replace2["default"])(structPath, new RegExp('\\[]', 'g'), "[".concat(n, "]"));
  return handleFieldsNested((0, _get2["default"])($tree, $struct));
};

var _default = {
  defaultValue: defaultValue,
  defaultClearValue: defaultClearValue,
  parseInput: parseInput,
  parsePath: parsePath,
  parseArrayProp: parseArrayProp,
  parseCheckArray: parseCheckArray,
  parseCheckOutput: parseCheckOutput,
  mergeSchemaDefaults: mergeSchemaDefaults,
  handleFieldsNested: handleFieldsNested,
  handleFieldsArrayOfStrings: handleFieldsArrayOfStrings,
  prepareFieldsData: prepareFieldsData,
  pathToFieldsTree: pathToFieldsTree
};
exports["default"] = _default;
module.exports = exports["default"];