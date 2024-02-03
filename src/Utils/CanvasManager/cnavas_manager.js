import Rope from './Rope'


class canvas_manager{
    /**
     * Main Engine for Graphic effects with Ropes
     * @param {HTMLCanvas} canvas 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(canvas,width,height,image,options){
        this.ctx = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.animation_id = 0;
        this.image_blob = image;
        this.ropes = [];
        const changed_options = options;
        options.pos_x = width/2;
        this.ropes.push(new Rope(this.ctx,options.quantity,changed_options,image));
        for(let x = 0; x < 30; x++){
            this.ropes.map(rope => rope.update(this.width,this.height))
        }
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



    destroy(){
        window.cancelAnimationFrame(this.animation_id);
    }
    
    /**
     * Private function
     */
    __private_start_animation(){
        const render_animation = () =>{
            this.ctx.clearRect(0,0,this.width,this.height);
            this.ropes.map(rope => rope.render(this.width,this.height,2));
            this.animation_id = window.requestAnimationFrame(render_animation);
        }
        this.animation_id = window.requestAnimationFrame(render_animation);
    }
}

export default canvas_manager;