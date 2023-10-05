import Rope from './Rope'


class canvas_manager{
    /**
     * Main Engine for Graphic effects with Ropes
     * @param {HTMLCanvas} canvas 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(canvas,width,height){
        this.ctx = canvas.getContext('2d');
        this.ctx.globalCompositeOperation = 'lighter';
        this.width = width;
        this.height = height;
        this.ropes = [];
        this.ropes.push(new Rope(this.ctx,50,100,{pos_x:5,pos_y:5,pos_ex:300,pos_ey:100},{color:"#875638",is_static_end:true}));
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
        this.ropes[0].vibrate("left",pos_x,pos_y);
    }
    
    /**
     * Renders canvas
     */
    render(){
        this.ctx.clearRect(0,0,this.width,this.height);
        this.ropes[0].render(this.width,this.height);
    }
}

export default canvas_manager;