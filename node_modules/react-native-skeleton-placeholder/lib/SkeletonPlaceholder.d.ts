/// <reference types="react" />
import { ViewStyle } from "react-native";
interface SkeletonPlaceholderProps {
    /**
     * Determines component's children.
     */
    children: JSX.Element | JSX.Element[];
    /**
     * Determines the color of placeholder.
     * @default #E1E9EE
     */
    backgroundColor?: string;
    /**
     * Determines the highlight color of placeholder.
     * @default #F2F8FC
     */
    highlightColor?: string;
    /**
     * Determines the animation speed in milliseconds. Use 0 to disable animation
     * @default 800
     */
    speed?: number;
    /**
     * Determines the animation direction, left or right
     * @default right
     */
    direction?: "left" | "right";
}
declare function SkeletonPlaceholder({ children, backgroundColor, speed, highlightColor, direction, }: SkeletonPlaceholderProps): JSX.Element;
declare namespace SkeletonPlaceholder {
    var Item: ({ children, ...style }: SkeletonPlaceholderItem) => JSX.Element;
}
export default SkeletonPlaceholder;
interface SkeletonPlaceholderItem extends ViewStyle {
    children?: JSX.Element | JSX.Element[];
}
//# sourceMappingURL=SkeletonPlaceholder.d.ts.map