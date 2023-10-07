"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _merge5 = _interopRequireDefault(require("lodash/merge"));

var _each2 = _interopRequireDefault(require("lodash/each"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Bindings = /*#__PURE__*/function () {
  function Bindings() {
    _classCallCheck(this, Bindings);

    _defineProperty(this, "templates", {// default: ({ field, props, keys, $try }) => ({
      //   [keys.id]: $try(props.id, field.id),
      // }),
    });

    _defineProperty(this, "rewriters", {
      "default": {
        id: 'id',
        name: 'name',
        type: 'type',
        value: 'value',
        checked: 'checked',
        label: 'label',
        placeholder: 'placeholder',
        disabled: 'disabled',
        onChange: 'onChange',
        onBlur: 'onBlur',
        onFocus: 'onFocus',
        autoFocus: 'autoFocus'
      }
    });
  }

  _createClass(Bindings, [{
    key: "load",
    value: function load(field) {
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
      var props = arguments.length > 2 ? arguments[2] : undefined;

      if ((0, _has2["default"])(this.rewriters, name)) {
        var $bindings = {};
        (0, _each2["default"])(this.rewriters[name], function ($v, $k) {
          return (0, _merge5["default"])($bindings, _defineProperty({}, $v, (0, _utils.$try)(props[$k], field[$k])));
        });
        return $bindings;
      }

      return this.templates[name]({
        keys: this.rewriters[name],
        $try: _utils.$try,
        field: field,
        props: props
      });
    }
  }, {
    key: "register",
    value: function register(bindings) {
      var _this = this;

      (0, _each2["default"])(bindings, function (val, key) {
        if ((0, _isFunction2["default"])(val)) (0, _merge5["default"])(_this.templates, _defineProperty({}, key, val));
        if ((0, _isPlainObject2["default"])(val)) (0, _merge5["default"])(_this.rewriters, _defineProperty({}, key, val));
      });
      return this;
    }
  }]);

  return Bindings;
}();

exports["default"] = Bindings;
module.exports = exports["default"];