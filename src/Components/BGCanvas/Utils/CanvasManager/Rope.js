import {Point,EndPoint} from "./Point";

class Rope{
    constructor(ctx,quantity,options,image){
        this.ctx = ctx;
        this.options = options;
        console.log(options);
        this.points = [];
        this.hovertt = 0;
        this.points.push(new EndPoint(options.pos_x,options.pos_y,0,0,null))
        for(let x = 1; x < quantity; x++){
            const pos_x = ((options.pos_ex - options.pos_x) / quantity)*x + options.pos_x;
            const pos_y = ((options.pos_ey - options.pos_y) / quantity)*x + options.pos_y;
            this.points.push(new Point(pos_x,pos_y,0,0,options));
        }
        this.points.push(new EndPoint(options.pos_ex,options.pos_ey,0,0,image,options,false));
    }

    distance(p1,p2){
        const l1 = p1.x - p2.x;
        const l2 = p1.y - p2.y;
        return Math.sqrt(l1 * l1+l2 * l2);
    }

    //DONE
    verlet(p1,p2,length){
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const ds = this.distance(p1,p2);
        const dif = length - ds;
        const percent = dif / ds / 2;
        const offsetX = dx * percent;
        const offsetY = dy * percent;
        if(p1.is_static !== true){
            p1.x += offsetX;
            p1.y += offsetY;
        }
        if(p2.is_static !== true){
            p2.x -= offsetX;
            p2.y -= offsetY;
        }
    }

    //DONE
    rotation(p1,p2){
        if(p1.x < p2.x){
            if(p1.y < p2.y){
                p2.setRotation(-1*(Math.asin(Math.abs(p1.x - p2.x)/this.distance(p1,p2))));
            }else{
                p2.setRotation((Math.acos(Math.abs(p1.y - p2.y)/this.distance(p1,p2))) - Math.PI);
            }
        }else{
            if(p1.y < p2.y){
                p2.setRotation((Math.acos(Math.abs(p1.y - p2.y)/this.distance(p1,p2))));
            }else{
                p2.setRotation(-1*(Math.asin(Math.abs(p1.x - p2.x)/this.distance(p1,p2))) + Math.PI);
            }
        }
    }

    mouseIntegration(x,y,handler){
        const now = Date.now();
        if(now - this.hovertt > this.options.mouse_hover_timeout)
        this.points.forEach(point =>{
            const distortion = this.options.mouse_hover_distortion;
            if(point.is_on_point(x,y,distortion)){
                handler(point);
                this.hovertt = now;
            }
        })
    }

    handleMovement(v_x,v_y){
        this.points[this.points.length-1].set_speed(v_x,v_y);
    }

    //DONE
    update(width,height,vercel_speed = 5){
        for(let x = 0; x < this.points.length; x++){
            this.points[x].update(width,height)
        }
        for(let x = 0; x < vercel_speed; x++){
            for(let x = 0; x < this.points.length-1; x++){
                this.verlet(this.points[x],this.points[x+1],this.options.verlet_target_distance);
            }
        }
        for(let x = 0; x < this.points.length-1; x++){
            this.rotation(this.points[x],this.points[x+1]);
            if(this.options.verlet_extend_length){
                this.points[x].set_y_size(this.distance(this.points[x],this.points[x+1]));
            }
        }
        this.rotation(this.points[this.options.img_rotate_target_index],this.points[this.points.length-1]);
    }

    cut_rope(){
        const old_points = this.points.slice(this.points.length/2,this.points.length);
        this.points = this.points.slice(0,this.points.length/2);
        return old_points;
    }

    //DONE
    render(width,height){
        this.update(width,height,this.options.verlet_calculate_per_frame);
        for(let x = 0; x < this.points.length; x++){
            this.points[x].render(this.ctx);
        }
    }
}

export default Rope;