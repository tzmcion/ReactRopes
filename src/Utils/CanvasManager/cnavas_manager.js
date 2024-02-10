import Rope from './Rope'


class canvas_manager{
    /**
     * Main Engine for Graphic effects with Ropes
     * @param {HTMLCanvas} canvas 
     * @param {number} width 
     * @param {number} height 
     * @param {image} string path to image rendered from blocks
     */
    constructor(canvas,width,height,image,options){
        this.ctx = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.animation_id = 0;
        this.image_blob = image;
        this.ropes = [];
        const changed_options = this.__private_check_options(options,width);
        this.ropes.push(new Rope(this.ctx,options.quantity,changed_options,image));
        // for(let x = 0; x < 30; x++){
        //     this.ropes.map(rope => rope.update(this.width,this.height))
        // }
        this.__private_start_animation = this.__private_start_animation.bind(this);
        this.__private_start_animation();
    }

    /**
     * Handles Canvas mouse Click, mouse click will separate loops
     * @param {number} pos_x 
     * @param {number} pos_y 
     */
    handleMouseClick(pos_x,pos_y){
        this.ropes.map(rope => {
            const points = rope.cut_rope();
            this.ropes.push(new Rope(this.ctx,0,0,rope.options,points));
            return 0;
        });
    }

    /**
     * Handles Canvas mouse move
     * @param {number} pos_x 
     * @param {number} pos_y 
     */
    handleMouseMove(pos_x,pos_y){
        this.ropes.map(rope => rope.vibrate("left",pos_x,pos_y));
    }


    /** 
    *   Method Canels animation frame
    */
    destroy(){
        window.cancelAnimationFrame(this.animation_id);
    }
    
    /**
     * Private function
     * Starts animation...
     */
    __private_start_animation(){
        const render_animation = () =>{
            this.ctx.clearRect(0,0,this.width,this.height);
            this.ropes.map(rope => rope.render(this.width,this.height,2));
            this.animation_id = window.requestAnimationFrame(render_animation);
        }
        this.animation_id = window.requestAnimationFrame(render_animation);
    }

    /**
     * Private function
     * checks option  and returns them
     * @param {options} options 
     */
    __private_check_options(options,width){
        const options_edited = {...options};
        if(options_edited.pos_x === 0){
            options_edited.pos_x = width / 2;
        }
        options_edited.pos_ex = options_edited.pos_x + options_edited.pos_ex;
        options_edited.pos_y = options_edited.pos_y + options_edited.pos_y;
        return options_edited;
    }
}

export default canvas_manager;