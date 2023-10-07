import { Animated } from 'react-native';
import type { CarouselProps } from 'src/carousel/types';
export declare function getInputRangeFromIndexes<TData>(range: number[], index: number, carouselProps: CarouselProps<TData>): number[];
export declare function defaultScrollInterpolator<TData>(index: number, carouselProps: CarouselProps<TData>): {
    inputRange: number[];
    outputRange: number[];
};
export declare function defaultAnimatedStyles<TData>(_index: number, animatedValue: Animated.AnimatedInterpolation, carouselProps: CarouselProps<TData>): {};
export declare function shiftAnimatedStyles<TData>(_index: number, animatedValue: Animated.AnimatedInterpolation, carouselProps: CarouselProps<TData>): {
    transform: {}[];
};
export declare function stackScrollInterpolator<TData>(index: number, carouselProps: CarouselProps<TData>): {
    inputRange: number[];
    outputRange: number[];
};
export declare function stackAnimatedStyles<TData>(index: number, animatedValue: Animated.AnimatedInterpolation, carouselProps: CarouselProps<TData>, cardOffset?: number): {
    opacity: Animated.AnimatedInterpolation;
    transform: ({
        scale: Animated.AnimatedInterpolation;
    } | {
        [x: string]: Animated.AnimatedInterpolation;
        scale?: undefined;
    })[];
    zIndex?: undefined;
} | {
    zIndex: number;
    opacity: Animated.AnimatedInterpolation;
    transform: ({
        scale: Animated.AnimatedInterpolation;
    } | {
        [x: string]: Animated.AnimatedInterpolation;
        scale?: undefined;
    })[];
};
export declare function tinderScrollInterpolator<TData>(index: number, carouselProps: CarouselProps<TData>): {
    inputRange: number[];
    outputRange: number[];
};
export declare function tinderAnimatedStyles<TData>(index: number, animatedValue: Animated.AnimatedInterpolation, carouselProps: CarouselProps<TData>, cardOffset?: number): {
    opacity: Animated.AnimatedInterpolation;
    transform: ({
        scale: Animated.AnimatedInterpolation;
        rotate?: undefined;
    } | {
        rotate: Animated.AnimatedInterpolation;
        scale?: undefined;
    } | {
        [x: string]: Animated.AnimatedInterpolation;
        scale?: undefined;
        rotate?: undefined;
    })[];
    zIndex?: undefined;
} | {
    zIndex: number;
    opacity: Animated.AnimatedInterpolation;
    transform: ({
        scale: Animated.AnimatedInterpolation;
        rotate?: undefined;
    } | {
        rotate: Animated.AnimatedInterpolation;
        scale?: undefined;
    } | {
        [x: string]: Animated.AnimatedInterpolation;
        scale?: undefined;
        rotate?: undefined;
    })[];
};
