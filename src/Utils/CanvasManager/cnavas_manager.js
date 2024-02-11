import Rope from './Rope'


class canvas_manager{
    constructor(canvas,width,height,image,options){
        this.ctx = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.animation_id = 0;
        const changed_options = this.__private_check_options(options,width);
        this.ropes = [];
        this.ropes.push(new Rope(this.ctx,options.quantity,changed_options,image));
        this.__private_start_animation();
    }

    handleMouseMove(pos_x,pos_y){
        this.ropes.map(rope => rope.vibrate("left",pos_x,pos_y));
    }

    destroy(){
        window.cancelAnimationFrame(this.animation_id);
    }
    
    __private_start_animation(){
        const render_animation = () =>{
            this.ctx.clearRect(0,0,this.width,this.height);
            this.ropes.map(rope => rope.render(this.width,this.height));
            this.animation_id = window.requestAnimationFrame(render_animation);
        }
        this.animation_id = window.requestAnimationFrame(render_animation);
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
}

export default canvas_manager;