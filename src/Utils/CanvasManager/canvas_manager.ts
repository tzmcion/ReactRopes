import { options_type } from "../../Options"
import { Point } from "./Point"
import Rope from './Rope'

interface movement_type {
    c_x:number,
    c_y:number,
    v_x:number,
    v_y:number,
    p_vx:number,
    p_vy:number
}

class canvas_manager{
    private ctx:CanvasRenderingContext2D
    private canvas:HTMLCanvasElement
    private animation_id:number
    private movement:movement_type
    private rope:Rope
    constructor(canvas:HTMLCanvasElement,public width:number,public height:number, image:string, public options:options_type ){
        this.ctx=canvas.getContext('2d')!;
        this.canvas = canvas;
        this.movement = {c_x:0,c_y:0,v_x:0,v_y:0,p_vx:0,p_vy:0};
        this.animation_id = 0;
        this.rope = new Rope(
            this.ctx,
            this.options.quantity,
            this.check_options(options,width),
            image
            );
        this.start_animation();
    }

    public handleMouseMove(p_x:number,p_y:number,handler:(arg:Point)=>void):void{
        this.rope.mouseIntegration(p_x,p_y,handler);
    }

    public destroy():void{
        window.cancelAnimationFrame(this.animation_id);
    }

    private start_animation():void{
        if(this.animation_id !== 0)return;
        const render_animation = () =>{
            this.ctx.clearRect(0,0,this.width,this.height);
            this.rope.render(this.width,this.height);
            this.detect_movement();
            this.animation_id = window.requestAnimationFrame(render_animation);
        }
        this.animation_id = window.requestAnimationFrame(render_animation);
    }

    private check_options(options:options_type,width:number):options_type{
        const options_edited = {...options};
        if(options_edited.pos_x === 0){
            options_edited.pos_x = width / 2;
        }
        options_edited.pos_ex = options_edited.pos_x + options_edited.pos_ex;
        options_edited.pos_y = options_edited.pos_y + options_edited.pos_y;
        if(options_edited.img_offset_y === 0){
            options_edited.img_offset_y = options_edited.img_size_y/8;
        }
        if(options_edited.img_offset_x === 0){
            options_edited.img_offset_x = options_edited.img_size_x/2;
        }
        return options_edited;
    }

    public set_last_pos():void{
        const x = this.canvas.getBoundingClientRect().x;
        const y =this.canvas.getBoundingClientRect().y;
        const {c_x,c_y,p_vx,p_vy} = this.movement;
        const new_movement = {
            p_x:c_x,
            p_y:c_y,
            c_x:x,
            c_y:y,
            v_x:Math.round((c_x-x)) === p_vx ? 0 : Math.round((c_x-x)),
            v_y:Math.round((c_y-y)) === p_vy ? 0 : Math.round((c_y-y)),
            p_vx:Math.round((c_x-x)),
            p_vy:Math.round((c_y-y))
        }
        this.movement = new_movement;
    }

    public set_initial_pos(x:number,y:number):void{
        this.movement.v_x = 0;
        this.movement.v_y = 0;
        this.movement.c_x = x;
        this.movement.c_y = y;
    }

    private detect_movement(){
        const movement_x = this.movement.v_x * -1;
        const movement_y = this.movement.v_y * -1;
        if(movement_x || movement_y){
            this.rope.handleMovement(movement_x * this.options.movement_detection_force,movement_y * this.options.movement_detection_force);
        }
    }
}

export default canvas_manager;