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

