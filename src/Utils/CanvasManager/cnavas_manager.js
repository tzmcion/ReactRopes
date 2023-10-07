import Rope from './Rope'
import Data from './Data';


class canvas_manager{
    /**
     * Main Engine for Graphic effects with Ropes
     * @param {HTMLCanvas} canvas 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(canvas,width,height){
        this.ctx = canvas.getContext('2d');
        this.ctx.globalCompositeOperation = 'source-over';
        this.width = width;
        this.height = height;
        this.ropes = [];
        Data.map(rope => this.ropes.push(new Rope(this.ctx,rope.quantiy,rope.positions,rope.options)));
        for(let x = 0; x < 30; x++){
            this.ropes.map(rope => rope.update(this.width,this.height))
        }
    }

    /**
     * Handles Canvas mouse Click
     * @param {number} pos_x 
     * @param {number} pos_y 
     */
    handleMouseClick(pos_x,pos_y){
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
     * Renders canvas
     */
    render(){
        this.ctx.clearRect(0,0,this.width,this.height);
        this.ropes.map(rope => rope.render(this.width,this.height))
    }
}

export default canvas_manager;