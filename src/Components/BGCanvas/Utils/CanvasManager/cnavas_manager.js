import Rope from './Rope'


class canvas_manager{
    constructor(canvas,width,height,image,options){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.animation_id = 0;
        this.options = options;
        this.movement = {p_x:0,p_y:0,c_x:0,c_y:0,v_x:0,v_y:0,p_vx:0,p_vy:0};
        const changed_options = this.__private_check_options(options,width);
        this.ropes = [];
        this.ropes.push(new Rope(this.ctx,options.quantity,changed_options,image));
        this.__private_start_animation();
    }

    handleMouseMove(pos_x,pos_y,handler,hoverTimeout){
        this.ropes.map(rope => rope.mouseIntegration(pos_x,pos_y,handler,hoverTimeout));
    }

    destroy(){
        window.cancelAnimationFrame(this.animation_id);
    }
    
    __private_start_animation(){
        if(this.animation_id === 0){
            const render_animation = () =>{
                this.ctx.clearRect(0,0,this.width,this.height);
                this.ropes.map(rope => rope.render(this.width,this.height));
                this.__private_detect_movement();
                this.animation_id = window.requestAnimationFrame(render_animation);
            }
            this.animation_id = window.requestAnimationFrame(render_animation);
        }
    }

    __private_check_options(options,width){
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

    set_last_pos(){
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

    set_initial_pos(x,y){
        this.movement.v_x = 0;
        this.movement.v_y = 0;
        this.movement.p_x = 0;
        this.movement.p_y = 0;
        this.movement.c_x = x;
        this.movement.c_y = y;
    }

    __private_detect_movement(){
        let movement_x = this.movement.v_x * -1;
        let movement_y = this.movement.v_y * -1;
        if(movement_x || movement_y){
            this.ropes.forEach(rope => rope.handleMovement(movement_x * this.options.movement_detection_force,movement_y * this.options.movement_detection_force));
        }
    }
}

export default canvas_manager;