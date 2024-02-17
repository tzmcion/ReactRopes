import { default_options } from './Options';
import { Point } from './Utils/CanvasManager/Point';
type props = {
    src: string;
    width: number;
    height: number;
    onHover?: (point: Point, event: Event) => void;
    options?: typeof default_options;
    className?: string;
    id?: string;
};
export default function BGCanvas({ src, width, height, id, className, onHover, options }: props): import("react/jsx-runtime").JSX.Element;
export {};
