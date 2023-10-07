import Point from "./Point";

class Rope{
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} quantity 
     * @param {Object{
     * pos_x:number,
     * pos_y:number,
     * pos_ex:number,
     * pos_ey:number
     * }} position 
     * @param {Object{
     * color:string,
     * gravity:number,
     * obj_width,
     * obj_height,
     * dist_between
     * }} options 
     */
    constructor(ctx,quantity,position, options){
        this.ctx = ctx;
        this.quantity = quantity;
        this.position = position;
        this.options = options;
        this.color = options.color === undefined ? options.color : 'white';
        this.points = [];
        this.points.push(new Point(position.pos_x,position.pos_y,0,0,{is_static:true}))
        for(let x = 0; x < quantity - 2; x++){
            let pos_x = (Math.abs(position.pos_x - position.pos_ex) / quantity)*x;
            let pos_y = (Math.abs(position.pos_y - position.pos_ey) / quantity)*x;
            this.points.push(new Point(pos_x,pos_y,0.2,0.2,{color:options.color,gravity:options.gravity,x_size:options.obj_width,y_size:options.obj_height,air_friction:options.air_friction,bounce_type:options.bounce_type}));
        }
        if(options.is_static_end === undefined){
            this.points.push(new Point(position.pos_ex,position.pos_ey,0,0,{is_static:true}));
        }else{
            if(options.is_static_end === true)
            this.points.push(new Point(position.pos_ex,position.pos_ey,0,0,{is_static:true}));
        }
    }

    /**
     * @param {number} p1 
     * @param {number} p2 
     * @returns {number} distance between 2 points 
     */
    distance(p1,p2){
        const l1 = p1.x - p2.x;
        const l2 = p1.y - p2.y;
        return Math.sqrt(l1 * l1+l2 * l2);
    }

    /**
     * Function is a varlet-integration between 2 points
     * it takes a length which is the acceptable distance
     * @param {number} p1 
     * @param {number} p2 
     * @param {number} length 
     */
    verlet(p1,p2,length){
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let ds = this.distance(p1,p2);
        let dif = length - ds;
        let percent = dif / ds / 2;
        let offsetX = dx * percent;
        let offsetY = dy * percent;

        if(p1.is_static !== true){
            if(p2.is_static){
                offsetX = offsetX * 2;
                offsetY = offsetY * 2;
            }
            p1.x += offsetX;
            p1.y += offsetY;
        }
        if(p2.is_static !== true){
            if(p1.is_static){
                offsetX = offsetX * 2;
                offsetY = offsetY * 2;
            }
            p2.x -= offsetX;
            p2.y -= offsetY;
        }
    }

    /**
     * Functions sets the rotation of each rectangle so they face each other
     * @param {number} p1 
     * @param {number} p2 
     */
    rotation(p1,p2){
        if(p1.x < p2.x){
            if(p1.y < p2.y){
                p2.setRotation(-1*(Math.asin(Math.abs(p1.x - p2.x)/this.distance(p1,p2))));
            }else{
                p2.setRotation((Math.acos(Math.abs(p1.y - p2.y)/this.distance(p1,p2))));
            }
        }else{
            if(p1.y < p2.y){
                p2.setRotation((Math.acos(Math.abs(p1.y - p2.y)/this.distance(p1,p2))));
            }else{
                p2.setRotation(-1*(Math.asin(Math.abs(p1.x - p2.x)/this.distance(p1,p2))));
            }
        }
    }

    /**
     * Function creates a vibration of the rope for x and y
     * @param {"left" | "right"} side 
     * @param {number} x
     * @param {number} y 
     */
    vibrate(side,x,y){
        for(let a = 0; a < this.points.length; a++){
            const point = this.points[a];
            if(point.is_on_point(x,y,1)){
                point.px = point.x + 50;
                point.py = point.y + 50;
                break;
            }
        }
    }

    /**
     * Function Calculates data without drawing it
     * @param {number} width 
     * @param {number} height 
     */
    update(width,height){
        for(let x = 0; x < this.points.length; x++){
            this.points[x].update(width,height)
        }
        for(let x = 0; x < 5; x++){
            for(let x = 0; x < this.points.length-1; x++){
                this.verlet(this.points[x],this.points[x+1],1);
            }
        }
        for(let x = 0; x < this.points.length-1; x++){
            this.rotation(this.points[x],this.points[x+1]);
        }
    }

    /**
     * Function renders a rope
     * @param {number} width Canvas width
     * @param {number} height Canvas height
     */
    render(width,height){
        this.update(width,height);
        for(let x = 0; x < this.points.length; x++){
            this.points[x].render(this.ctx)
        }
    }
}

export default Rope;