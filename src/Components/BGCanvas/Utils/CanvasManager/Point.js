
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
        this.y_size = options.obj_height === undefined ? 8 : options.obj_height;
        this.x_size = options.obj_width === undefined ? 4 : options.obj_width;
        this.is_static = options.is_static === undefined ? false : options.is_static;
        this.color = options.color === undefined ? 'black' : options.color;
        this.radial_blocks = options.radial_blocks === undefined ? false : options.radial_blocks;
        this.weight = 1;
        this.rotation = 0;
        this.offset_x = 0;
        this.offset_y = 0;
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

    set_y_size(size){
        this.y_size = size;
    }

    update(width,height){
        if(!this.is_static){
            let vx = (this.x - this.px) * this.air_friction;
            let vy = (this.y - this.py) * this.air_friction;
            vy += this.gravity * this.weight;
            this.px = this.x;
            this.py = this.y;
            this.x += vx;
            this.y += vy;
            let of_wall_bounce;
            if(this.bounce_type <= -1){
                of_wall_bounce = this.wall_bounce(width,height,vx,vy);
                if(this.bounce_type <= -2){
                    this.ground_bounce(width,height,vx,vy,of_wall_bounce);
                    if(this.bounce_type <= -3){
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
            this.y = this.y_size;
            this.py = this.y_size - (vy)*this.bounce;
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
        const real_x = this.x - this.offset_x;
        const real_y = this.y - this.offset_y;
        if(x > real_x - distortion && x < real_x + this.x_size + distortion){
            if(y > real_y - distortion && y < real_y + this.y_size + distortion){
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
        if(!this.is_static){
            if(this.radial_blocks){
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x,this.y,this.x_size,0,Math.PI*2);
                ctx.fill();
                ctx.closePath();
                return;
            }
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.translate(this.x + this.x_size / 2, this.y + this.y_size / 2);
            ctx.rotate(this.rotation);
            ctx.fillRect(-this.x_size / 2, -this.y_size / 2, this.x_size, this.y_size);
            ctx.restore()
        }
    }

    /**
     * Method applies speed to the point
     */
    set_speed(vx = 0,vy = 0){
        this.px = this.px + vx;
        this.py = this.py + vy;
    }

    /**
     * Method sets different color for some time
     */
    set_color(color,timeout = 2000){
        const org = this.color;
        this.color = color;
        setTimeout(()=>{
            this.color = org;
        },timeout)
    }

    set_size(x_size = this.x_size,y_size = this.y_size,timeout = 2000){
        const org = {x_s: this.x_size, y_s: this.y_size};
        this.x_size = x_size;
        this.y_size = y_size;
        setTimeout(()=>{
            this.x_size = org.x_s;
            this.y_size = org.y_s;
        },timeout)
    }
}

class EndPoint extends Point{
    constructor(x,y,vx,vy,image,options,static_p = true){
        super(x,y,vx,vy,options);
        if(static_p){
            this.is_static = true;
            this.image = null;
            return;
        }
        this.image = null;
        this.image = new Image(100,100);
        this.image.src = image;
        if(typeof image === 'object'){
            this.image = null;
            this.is_static = true;
        }
        this.x_size=options.img_size_x;
        this.y_size=options.img_size_y;
        this.offset_x = options.img_offset_x;
        this.offset_y = options.img_offset_y;
        this.weight = options.img_weight;
    }

    render(ctx){
        if(!this.is_static){
        this.x-=this.offset_x;
        this.y-=this.offset_y;
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.x + this.x_size / 2, this.y + this.y_size / 2);
        ctx.rotate(this.rotation);
        if(this.image)
        ctx.drawImage(this.image,-this.x_size / 2, -this.y_size / 2, this.x_size, this.y_size);
        ctx.restore()
        this.x+=this.offset_x;
        this.y+=this.offset_y;
    }
    }
}

export {Point,EndPoint};