import { options_type } from "../../Options";
import { Point } from "./Point";
declare class canvas_manager {
    width: number;
    height: number;
    options: options_type;
    private ctx;
    private canvas;
    private animation_id;
    private movement;
    private rope;
    constructor(canvas: HTMLCanvasElement, width: number, height: number, image: string, options: options_type);
    handleMouseMove(p_x: number, p_y: number, handler: (arg: Point) => void): void;
    destroy(): void;
    private start_animation;
    private check_options;
    set_last_pos(): void;
    set_initial_pos(x: number, y: number): void;
    private detect_movement;
}
export default canvas_manager;
