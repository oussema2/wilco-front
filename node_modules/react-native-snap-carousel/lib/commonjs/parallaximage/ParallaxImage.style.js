"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

var _default = _reactNative.StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    position: 'relative',
    resizeMode: 'cover',
    width: undefined,
    height: undefined
  },
  loaderContainer: { ..._reactNative.StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

exports.default = _default;
//# sourceMappingURL=ParallaxImage.style.js.map