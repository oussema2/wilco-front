import React, { PureComponent, ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import type Carousel from 'src/carousel/Carousel';
declare type PaginationProps<TData> = {
    activeDotIndex: number;
    dotsLength: number;
    activeOpacity?: number;
    carouselRef?: Carousel<TData> | null;
    containerStyle?: StyleProp<ViewStyle>;
    dotColor?: string;
    dotContainerStyle?: StyleProp<ViewStyle>;
    dotElement?: ReactElement;
    dotStyle?: StyleProp<ViewStyle>;
    inactiveDotColor?: string;
    inactiveDotElement?: ReactElement;
    inactiveDotOpacity: number;
    inactiveDotScale: number;
    inactiveDotStyle?: StyleProp<ViewStyle>;
    renderDots?: (activeIndex: number, length: number, context: Pagination<TData>) => ReactElement;
    tappableDots: boolean;
    vertical: boolean;
    accessibilityLabel?: string;
    animatedDuration: number;
    animatedFriction: number;
    animatedTension: number;
    delayPressInDot: number;
};
export default class Pagination<TData> extends PureComponent<PaginationProps<TData>> {
    static defaultProps: {
        inactiveDotOpacity: number;
        inactiveDotScale: number;
        tappableDots: boolean;
        vertical: boolean;
        animatedDuration: number;
        animatedFriction: number;
        animatedTension: number;
        delayPressInDot: number;
    };
    constructor(props: PaginationProps<TData>);
    _needsRTLAdaptations(): boolean;
    get _activeDotIndex(): number;
    get dots(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.FunctionComponentElement<any>[];
    render(): false | JSX.Element;
}
export {};
