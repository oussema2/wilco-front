import { PureComponent, RefObject } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import type Carousel from 'src/carousel/Carousel';
declare type PaginationDotProps<TData> = {
    inactiveOpacity: number;
    inactiveScale: number;
    active?: boolean;
    activeOpacity?: number;
    animatedDuration?: number;
    animatedFriction?: number;
    animatedTension?: number;
    carouselRef?: Carousel<TData> | RefObject<Carousel<TData>> | null;
    color?: string;
    containerStyle?: StyleProp<ViewStyle>;
    delayPressInDot?: number;
    inactiveColor?: string;
    inactiveStyle?: StyleProp<ViewStyle>;
    index?: number;
    style?: StyleProp<ViewStyle>;
    tappable?: boolean;
};
declare type PaginationDotState = {
    animColor: Animated.Value;
    animOpacity: Animated.Value;
    animTransform: Animated.Value;
};
export default class PaginationDot<TData> extends PureComponent<PaginationDotProps<TData>, PaginationDotState> {
    constructor(props: PaginationDotProps<TData>);
    componentDidMount(): void;
    componentDidUpdate(prevProps: PaginationDotProps<TData>): void;
    _animate(toValue?: number): void;
    get _shouldAnimateColor(): string | undefined;
    render(): JSX.Element;
}
export {};
