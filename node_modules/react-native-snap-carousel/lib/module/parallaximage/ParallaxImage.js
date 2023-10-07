function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Parallax effect inspired by https://github.com/oblador/react-native-parallax/
import React, { Component } from 'react';
import { View, Animated, Easing, ActivityIndicator, findNodeHandle } from 'react-native';
import styles from './ParallaxImage.style';
export let ParallaxImageStatus;

(function (ParallaxImageStatus) {
  ParallaxImageStatus[ParallaxImageStatus["LOADING"] = 1] = "LOADING";
  ParallaxImageStatus[ParallaxImageStatus["LOADED"] = 2] = "LOADED";
  ParallaxImageStatus[ParallaxImageStatus["TRANSITION_FINISHED"] = 3] = "TRANSITION_FINISHED";
  ParallaxImageStatus[ParallaxImageStatus["ERROR"] = 4] = "ERROR";
})(ParallaxImageStatus || (ParallaxImageStatus = {}));

export default class ParallaxImage extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "_container", void 0);

    _defineProperty(this, "_mounted", void 0);

    this.state = {
      offset: 0,
      width: 0,
      height: 0,
      status: ParallaxImageStatus.LOADING,
      animOpacity: new Animated.Value(0)
    };
    this._onLoad = this._onLoad.bind(this);
    this._onError = this._onError.bind(this);
    this._measureLayout = this._measureLayout.bind(this);
  }

  setNativeProps(nativeProps) {
    var _this$_container;

    (_this$_container = this._container) === null || _this$_container === void 0 ? void 0 : _this$_container.setNativeProps(nativeProps);
  }

  componentDidMount() {
    this._mounted = true;
    setTimeout(() => {
      this._measureLayout();
    }, 0);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  _measureLayout() {
    if (this._container) {
      const {
        dimensions,
        carouselRef
      } = this.props;
      const nodeHandle = findNodeHandle(carouselRef);

      if (carouselRef && nodeHandle) {
        this._container.measureLayout(nodeHandle, (x, y, width, height) => {
          const offset = this.props.vertical ? y - (this.props.sliderHeight - this.props.itemHeight) / 2 : x - (this.props.sliderWidth - this.props.itemWidth) / 2;
          this.setState({
            offset: offset,
            width: dimensions && dimensions.width ? dimensions.width : Math.ceil(width),
            height: dimensions && dimensions.height ? dimensions.height : Math.ceil(height)
          });
        }, // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {});
      }
    }
  }

  _onLoad(event) {
    const {
      animOpacity
    } = this.state;
    const {
      fadeDuration,
      onLoad
    } = this.props;

    if (!this._mounted) {
      return;
    }

    this.setState({
      status: ParallaxImageStatus.LOADED
    });

    if (onLoad) {
      onLoad(event);
    }

    Animated.timing(animOpacity, {
      toValue: 1,
      duration: fadeDuration,
      easing: Easing.out(Easing.quad),
      isInteraction: false,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        status: ParallaxImageStatus.TRANSITION_FINISHED
      });
    });
  } // If arg is missing from method signature, it just won't be called


  _onError(event) {
    const {
      onError
    } = this.props;
    this.setState({
      status: ParallaxImageStatus.ERROR
    });

    if (onError) {
      onError(event);
    }
  }

  get image() {
    const {
      status,
      animOpacity,
      offset,
      width,
      height
    } = this.state;
    const {
      scrollPosition,
      // False positive :( other doesn't have the dimension key
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      dimensions,
      parallaxFactor,
      style,
      AnimatedImageComponent,
      ...other
    } = this.props;
    const parallaxPadding = (this.props.vertical ? height : width) * parallaxFactor;
    const requiredStyles = {
      position: 'relative'
    };
    const dynamicStyles = {
      width: this.props.vertical ? width : width + parallaxPadding * 2,
      height: this.props.vertical ? height + parallaxPadding * 2 : height,
      opacity: animOpacity,
      transform: scrollPosition ? [{
        translateX: !this.props.vertical ? scrollPosition.interpolate({
          inputRange: [offset - this.props.sliderWidth, offset + this.props.sliderWidth],
          outputRange: [-parallaxPadding, parallaxPadding],
          extrapolate: 'clamp'
        }) : 0
      }, {
        translateY: this.props.vertical ? scrollPosition.interpolate({
          inputRange: [offset - this.props.sliderHeight, offset + this.props.sliderHeight],
          outputRange: [-parallaxPadding, parallaxPadding],
          extrapolate: 'clamp'
        }) : 0
      }] : []
    };
    return /*#__PURE__*/React.createElement(AnimatedImageComponent, _extends({}, other, {
      style: [styles.image, style, requiredStyles, dynamicStyles],
      onLoad: this._onLoad,
      onError: status !== ParallaxImageStatus.TRANSITION_FINISHED ? this._onError : undefined // prevent infinite-loop bug

    }));
  }

  get spinner() {
    const {
      status
    } = this.state;
    const {
      showSpinner,
      spinnerColor
    } = this.props;
    return status === ParallaxImageStatus.LOADING && showSpinner ? /*#__PURE__*/React.createElement(View, {
      style: styles.loaderContainer
    }, /*#__PURE__*/React.createElement(ActivityIndicator, {
      size: "small",
      color: spinnerColor,
      animating: true
    })) : false;
  }

  render() {
    const {
      containerStyle
    } = this.props;
    return /*#__PURE__*/React.createElement(View, {
      ref: c => {
        this._container = c;
      },
      pointerEvents: "none",
      style: [containerStyle, styles.container],
      onLayout: this._measureLayout
    }, this.image, this.spinner);
  }

}

_defineProperty(ParallaxImage, "defaultProps", {
  containerStyle: {},
  fadeDuration: 500,
  parallaxFactor: 0.3,
  showSpinner: true,
  spinnerColor: 'rgba(0, 0, 0, 0.4)',
  AnimatedImageComponent: Animated.Image
});
//# sourceMappingURL=ParallaxImage.js.map