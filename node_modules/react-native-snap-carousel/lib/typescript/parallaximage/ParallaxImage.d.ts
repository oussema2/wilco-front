import { Component } from 'react';
import { View, Animated, findNodeHandle, ImageProps, StyleProp, ViewStyle, NativeSyntheticEvent, ImageLoadEventData, ImageErrorEventData } from 'react-native';
declare type VerticalProps = {
    vertical: true;
    sliderHeight: number;
    itemHeight: number;
};
declare type HorizontalProps = {
    vertical: false;
    sliderWidth: number;
    itemWidth: number;
};
declare type ParallaxImageProps = {
    carouselRef: Parameters<typeof findNodeHandle>[0];
    scrollPosition: Animated.Value | undefined;
    containerStyle: StyleProp<ViewStyle>;
    dimensions?: {
        width: number;
        height: number;
    };
    fadeDuration: number;
    parallaxFactor: number;
    showSpinner: boolean;
    spinnerColor: string;
    AnimatedImageComponent: typeof Animated.Image;
} & ImageProps & (VerticalProps | HorizontalProps);
export declare enum ParallaxImageStatus {
    'LOADING' = 1,
    'LOADED' = 2,
    'TRANSITION_FINISHED' = 3,
    'ERROR' = 4
}
declare type ParallaxImageState = {
    offset: number;
    width: number;
    height: number;
    status: ParallaxImageStatus;
    animOpacity: Animated.Value;
};
export default class ParallaxImage extends Component<ParallaxImageProps, ParallaxImageState> {
    static defaultProps: {
        containerStyle: {};
        fadeDuration: number;
        parallaxFactor: number;
        showSpinner: boolean;
        spinnerColor: string;
        AnimatedImageComponent: Animated.AnimatedComponent<typeof import("react-native").Image>;
    };
    _container?: View | null;
    _mounted?: boolean;
    constructor(props: ParallaxImageProps);
    setNativeProps(nativeProps: {
        [key: string]: unknown;
    }): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    _measureLayout(): void;
    _onLoad(event: NativeSyntheticEvent<ImageLoadEventData>): void;
    _onError(event: NativeSyntheticEvent<ImageErrorEventData>): void;
    get image(): JSX.Element;
    get spinner(): false | JSX.Element;
    render(): JSX.Element;
}
export {};
