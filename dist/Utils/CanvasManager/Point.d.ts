import { options_type } from "../../Options";
declare class Point {
    protected x: number;
    protected y: number;
    protected options: options_type;
    protected is_static: boolean;
    private px;
    private py;
    protected rotation: number;
    constructor(x: number, y: number, vx: number, vy: number, options: options_type, is_static?: boolean);
    setRotation(rotation: number): void;
    set_y_size(size: number): void;
    get_position(): {
        x: number;
        y: number;
    };
    set_position(x: number, y: number): void;
    update(width: number, height: number): void;
    is_on_point(x: number, y: number, distortion: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
    set_speed(vx?: number, vy?: number): void;
    private wall_bounce;
    private celling_bounce;
    private ground_bounce;
}
declare class EndPoint extends Point {
    private image;
    constructor(x: number, y: number, vx: number, vy: number, options: options_type, is_static?: boolean, image?: string);
    render(ctx: CanvasRenderingContext2D): void;
    is_on_point(x: number, y: number, distortion: number): boolean;
}
export { Point, EndPoint };
