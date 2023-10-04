/** 
    Class point is a single point in the canvas where velocity
    is calculated dynamically based on the last posiition of  apoint,
    it also implements variables like friction, gravity and bounce
*/
class Point{
    /** 
        Point takes 5 arguments, 4 are mandatory,
        x position, y position, velocity x and velocity y,
        velocity is transfered into last_x, which is px and py
        5-th argument are options, where every option is optional :)
        {
            @param gravity: def: 0.7
            @param bounce: def: 0.95,
            @param bounce_type: -1 or -2 or -3, walls, wall+ground, everything
            @param friction: def:0.95
            @param air_friction: def:0.99,
            @param x_size: def:2
            @param y_size: def:6
            @param is_static:def:false
            @param color: def:black
        }

    */
    constructor(x,y,vx,vy,options = {}){
        this.base_x = x;    
        this.base_y = y;
        this.x = x;
        this.y = y;
        this.px = x - vx;
        this.py = y - vy;
        this.gravity = options.gravity === undefined ? 0.25 : options.gravity;
        this.bounce = options.bounce === undefined ? 0.95 : options.bounce;
        this.bounce_type = options.bounce_type === undefined ? -2 : options.bounce_type;
        this.friction = options.friction === undefined ? 0.95 : options.friction;
        this.air_friction = options.air_friction === undefined ? 0.99 : options.air_friction;
        this.y_size = options.y_size === undefined ? 8 : options.y_size;
        this.x_size = options.x_size === undefined ? 4 : options.x_size;
        this.is_static = options.is_static === undefined ? false : options.is_static;
        this.color = options.color === undefined ? 'black' : options.color;
        this.rotation = 0;
        this.mouse_yes_time = 0;
        this.is_clicked = false;
    }

    /**
     * sets the rotation of the rectangle
     * @param {number} rotation 
     */
    setRotation(rotation){
        this.rotation = rotation;
    }

    update(width,height){
        if(!this.is_static){
            let vx = (this.x - this.px) * this.air_friction;
            let vy = (this.y - this.py) * this.air_friction;
            vy += this.gravity;
            this.px = this.x;
            this.py = this.y;
            this.x += vx;
            this.y += vy;
            let of_wall_bounce;
            if(this.bounce_type <= -1){
                of_wall_bounce = this.wall_bounce(width,height,vx,vy);
                if(this.bounce_type <= -2){
                    this.ground_bounce(width,height,vx,vy,of_wall_bounce);
                    if(this.bounce <= -3){
                        this.celling_bounce(width,height,vx,vy);
                    }
                }
            }
        }
    }

    /**
     * bounce of walls
     * @param {number} width 
     * @param {number} height 
     * @param {number} vx 
     * @param {number} vy 
     * @returns boolean did ball bounced of wall
     */
    wall_bounce(width,height,vx,vy){
        let of_wall_bounce = false;
        if(this.x >= width-this.x_size)
        {
            this.x = width-this.x_size;
            this.px = width - this.x_size + vx;
            of_wall_bounce = true;
        }
        if(this.x < 0+this.x_size){
            this.x = 0+this.x_size;
            this.px = vx + this.x_size;
            of_wall_bounce = true;
        }
        return of_wall_bounce;
    }

    /**
     * ceiling bounce
     * @param {number} width 
     * @param {number} height 
     * @param {number} vx 
     * @param {number} vy 
     */
    celling_bounce(width,height,vx,vy){
        if(this.y < 0 + this.y_size ){
            this.y = 0 + this.y_size;
            this.py = vy + this.y_size;
        }
    }

    /**
     * ground_bounce
     * @param {number} width 
     * @param {number} height 
     * @param {number} vx 
     * @param {number} vy 
     * @param {boolean} of_wall_bounce 
     */
    ground_bounce(width,height,vx,vy,of_wall_bounce){
        if(this.y >= height-this.y_size){
            this.y = height-this.y_size;
            this.py = height-this.y_size+vy*this.bounce;
            if(!of_wall_bounce)
            this.px = this.x - (vx*this.friction);
        }
    }

    /**
     * Function checks if the coordinates are where the Point is
     * @param {number} x 
     * @param {number} y 
     * @param {number} distortion=4 It how innacurate it is, since points are usually small, 
     * @returns {boolean} true/false
     */
    is_on_point(x,y,distortion = 4){
        if(x > this.x - distortion && x < this.x + this.x_size + distortion){
            if(y > this.y - distortion && y < this.y + this.y_size + distortion){
                const date = Date.now();
                if(date - this.mouse_yes_time >= 100){
                    this.mouse_yes_time = date;
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Function render renders Point, takes canvas ctx on which it will be drawn
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx){
        ctx.fillStyle = this.color;
        ctx.translate(this.x + this.x_size/2,this.y+this.y_size/2);
        ctx.rotate(this.rotation);
        ctx.translate((this.x + this.x_size/2)*-1,(this.y + this.y_size/2)*-1);
        ctx.fillRect(this.x,this.y,this.x_size,this.y_size);
        ctx.strokeRect(this.x,this.y,this.x_size,this.y_size);
        ctx.translate(this.x + this.x_size/2,this.y+this.y_size/2);
        ctx.rotate(-1*(this.rotation));
        ctx.translate((this.x + this.x_size/2)*-1,(this.y + this.y_size/2)*-1);
    }
}


class Rope{
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} width 
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
    constructor(ctx,width,quantity,position, options){
        this.ctx = ctx;
        this.width = width;
        this.quantity = quantity;
        this.position = position;
        this.options = options;
        this.color = options.color === undefined ? options.color : 'white';
        this.points = [];
        this.points.push(new Point(position.pos_x,position.pos_y,0,0,{is_static:true}))
        for(let x = 0; x < quantity - 2; x++){
            let pos_x = (Math.abs(position.pos_x - position.pos_ex) / quantity)*x;
            let pos_y = (Math.abs(position.pos_y - position.pos_ey) / quantity)*x;
            this.points.push(new Point(pos_x,pos_y,0.2,0.2,{color:options.color}));
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
            p2.setRotation(-1*(Math.asin(Math.abs(p1.x - p2.x)/this.distance(p1,p2))));
        }else{
            p2.setRotation((Math.acos(Math.abs(p1.y - p2.y)/this.distance(p1,p2))));
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
     * Function renders a rope
     * @param {number} width Canvas width
     * @param {number} height Canvas height
     */
    render(width,height){
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
        for(let x = 0; x < this.points.length; x++){
            this.points[x].render(this.ctx)
        }
    }
}


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
        this.ropes.push(new Rope(this.ctx,50,50,{pos_x:5,pos_y:5,pos_ex:300,pos_ey:100},{color:"#875638",is_static_end:true}));
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