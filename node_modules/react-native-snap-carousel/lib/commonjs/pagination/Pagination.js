"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _PaginationDot = _interopRequireDefault(require("./PaginationDot"));

var _Pagination = _interopRequireDefault(require("./Pagination.style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const IS_IOS = _reactNative.Platform.OS === 'ios';
const IS_RTL = _reactNative.I18nManager.isRTL;

class Pagination extends _react.PureComponent {
  constructor(props) {
    super(props); // Warnings

    if (props.dotColor && !props.inactiveDotColor || !props.dotColor && props.inactiveDotColor) {
      console.warn('react-native-snap-carousel | Pagination: ' + 'You need to specify both `dotColor` and `inactiveDotColor`');
    }

    if (props.dotElement && !props.inactiveDotElement || !props.dotElement && props.inactiveDotElement) {
      console.warn('react-native-snap-carousel | Pagination: ' + 'You need to specify both `dotElement` and `inactiveDotElement`');
    }

    if (props.tappableDots && props.carouselRef === undefined) {
      console.warn('react-native-snap-carousel | Pagination: ' + 'You must specify prop `carouselRef` when setting `tappableDots` to `true`');
    }
  }

  _needsRTLAdaptations() {
    const {
      vertical
    } = this.props;
    return IS_RTL && !IS_IOS && !vertical;
  }

  get _activeDotIndex() {
    const {
      activeDotIndex,
      dotsLength
    } = this.props;
    return this._needsRTLAdaptations() ? dotsLength - activeDotIndex - 1 : activeDotIndex;
  }

  get dots() {
    const {
      activeOpacity,
      carouselRef,
      dotsLength,
      dotColor,
      dotContainerStyle,
      dotElement,
      dotStyle,
      inactiveDotColor,
      inactiveDotElement,
      inactiveDotOpacity,
      inactiveDotScale,
      inactiveDotStyle,
      renderDots,
      tappableDots,
      animatedDuration,
      animatedFriction,
      animatedTension,
      delayPressInDot
    } = this.props;

    if (renderDots) {
      return renderDots(this._activeDotIndex, dotsLength, this);
    }

    const DefaultDot = /*#__PURE__*/_react.default.createElement(_PaginationDot.default, {
      carouselRef: carouselRef,
      tappable: tappableDots && typeof carouselRef !== 'undefined',
      activeOpacity: activeOpacity,
      color: dotColor,
      containerStyle: dotContainerStyle,
      style: dotStyle,
      inactiveColor: inactiveDotColor,
      inactiveOpacity: inactiveDotOpacity,
      inactiveScale: inactiveDotScale,
      inactiveStyle: inactiveDotStyle,
      animatedDuration: animatedDuration,
      animatedFriction: animatedFriction,
      animatedTension: animatedTension,
      delayPressInDot: delayPressInDot
    });

    const dots = [...Array(dotsLength).keys()].map(i => {
      const isActive = i === this._activeDotIndex;
      return /*#__PURE__*/_react.default.cloneElement((isActive ? dotElement : inactiveDotElement) || DefaultDot, {
        key: "pagination-dot-".concat(i),
        active: isActive,
        index: i
      });
    });
    return dots;
  }

  render() {
    const {
      dotsLength,
      containerStyle,
      vertical,
      accessibilityLabel
    } = this.props;

    if (!dotsLength || dotsLength < 2) {
      return false;
    }

    const style = [_Pagination.default.sliderPagination, {
      flexDirection: vertical ? 'column' : this._needsRTLAdaptations() ? 'row-reverse' : 'row'
    }, containerStyle || {}];
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      pointerEvents: "box-none",
      style: style,
      accessible: !!accessibilityLabel,
      accessibilityLabel: accessibilityLabel
    }, this.dots);
  }

}

exports.default = Pagination;

_defineProperty(Pagination, "defaultProps", {
  inactiveDotOpacity: 0.5,
  inactiveDotScale: 0.5,
  tappableDots: false,
  vertical: false,
  animatedDuration: 250,
  animatedFriction: 4,
  animatedTension: 50,
  delayPressInDot: 0
});
//# sourceMappingURL=Pagination.js.map