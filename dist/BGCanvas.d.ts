import { default_options } from './Options';
import { Point } from './Utils/CanvasManager/Point';
type props = {
    src: string;
    width: number;
    height: number;
    onHover?: (point: Point, event: Event) => void;
    options?: typeof default_options;
};
export default function BGCanvas({ src, width, height, onHover, options }: props): import("react/jsx-runtime").JSX.Element;
export {};
