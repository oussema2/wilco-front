"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
  Field Helpers
*/
var _default = {
  /**
   Fields Selector (alias of select)
   */
  $: function $(key) {
    return this.select(key);
  },

  /**
   Fields Values (recursive with Nested Fields)
   */
  values: function values() {
    return this.get('value');
  },

  /**
   Fields Errors (recursive with Nested Fields)
   */
  errors: function errors() {
    return this.get('error');
  },

  /**
   Fields Labels (recursive with Nested Fields)
   */
  labels: function labels() {
    return this.get('label');
  },

  /**
   Fields Placeholders (recursive with Nested Fields)
   */
  placeholders: function placeholders() {
    return this.get('placeholder');
  },

  /**
   Fields Default Values (recursive with Nested Fields)
   */
  defaults: function defaults() {
    return this.get('default');
  },

  /**
   Fields Initial Values (recursive with Nested Fields)
   */
  initials: function initials() {
    return this.get('initial');
  },

  /**
   Fields Types (recursive with Nested Fields)
   */
  types: function types() {
    return this.get('type');
  }
};
exports["default"] = _default;
module.exports = exports["default"];