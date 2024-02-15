import { options_type } from "../../Options";
import { Point } from "./Point";
declare class Rope {
    private ctx;
    private options;
    private points;
    private hover;
    constructor(ctx: CanvasRenderingContext2D, quantity: number, options: options_type, image: string);
    private distance;
    private verlet;
    private rotation;
    mouseIntegration(x: number, y: number, handler: (arg0: Point) => void): void;
    handleMovement(vx: number, vy: number): void;
    update(width: number, height: number, vercel_s?: number): void;
    render(width: number, height: number): void;
}
export default Rope;
