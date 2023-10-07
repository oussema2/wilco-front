function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import { I18nManager, Platform, View } from 'react-native';
import PaginationDot from './PaginationDot';
import styles from './Pagination.style';
const IS_IOS = Platform.OS === 'ios';
const IS_RTL = I18nManager.isRTL;
export default class Pagination extends PureComponent {
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

    const DefaultDot = /*#__PURE__*/React.createElement(PaginationDot, {
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
      return /*#__PURE__*/React.cloneElement((isActive ? dotElement : inactiveDotElement) || DefaultDot, {
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

    const style = [styles.sliderPagination, {
      flexDirection: vertical ? 'column' : this._needsRTLAdaptations() ? 'row-reverse' : 'row'
    }, containerStyle || {}];
    return /*#__PURE__*/React.createElement(View, {
      pointerEvents: "box-none",
      style: style,
      accessible: !!accessibilityLabel,
      accessibilityLabel: accessibilityLabel
    }, this.dots);
  }

}

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