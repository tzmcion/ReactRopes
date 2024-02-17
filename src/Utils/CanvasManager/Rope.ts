import { options_type } from "../../Options";
import { Point,EndPoint } from "./Point";

class Rope{
    private points:Array<Point>
    private hover:number
    constructor(
        private ctx:CanvasRenderingContext2D,
        quantity:number,
        private options:options_type,
        image:string
    ){
        this.hover = 0;
        this.points = [];
        this.points.push(
            new EndPoint(options.pos_x,options.pos_y,0,0,options,true)
        )
        for(let x = 1; x < quantity; x++){
            const pos_x = ((options.pos_ex - options.pos_x) / quantity)*x + options.pos_x;
            const pos_y = ((options.pos_ey - options.pos_y) / quantity)*x + options.pos_y;
            this.points.push(new Point(pos_x,pos_y,0,0,options));
        }
        this.points.push(
            new EndPoint(options.pos_ex,options.pos_ey,0,0,options,false,image)
        );
    }

    private distance(p1:Point,p2:Point){
        const l1 = Math.pow(p1.get_position().x - p2.get_position().x,2);
        const l2 = Math.pow(p1.get_position().y - p2.get_position().y,2);
        return Math.sqrt(l1+l2);
    }

    private verlet(p1:Point,p2:Point,length:number):void{
        const p1_pos = p1.get_position();
        const p2_pos = p2.get_position();
        const dx = p1_pos.x - p2_pos.x;
        const dy = p1_pos.y - p2_pos.y;
        const ds = this.distance(p1,p2);
        const dif = length - ds;
        const percent = dif / ds / 2;
        const offsetX = dx * percent;
        const offsetY = dy * percent;
        p1.set_position(p1_pos.x + offsetX, p1_pos.y + offsetY);
        p2.set_position(p2_pos.x - offsetX, p2_pos.y - offsetY);
    }

    private rotation(p1_o:Point,p2_o:Point):void{
        const p1 = p1_o.get_position();
        const p2 = p2_o.get_position();
        if(p1.x < p2.x){
            if(p1.y < p2.y){
                p2_o.setRotation(-1*(Math.asin(Math.abs(p1.x - p2.x)/this.distance(p1_o,p2_o))));
            }else{
                p2_o.setRotation((Math.acos(Math.abs(p1.y - p2.y)/this.distance(p1_o,p2_o))) - Math.PI);
            }
        }else{
            if(p1.y < p2.y){
                p2_o.setRotation((Math.acos(Math.abs(p1.y - p2.y)/this.distance(p1_o,p2_o))));
            }else{
                p2_o.setRotation(-1*(Math.asin(Math.abs(p1.x - p2.x)/this.distance(p1_o,p2_o))) + Math.PI);
            }
        }
    }

    public mouseIntegration(x:number,y:number,handler:(arg0:Point)=>void):void{
        const now = Date.now();
        if(now - this.hover > this.options.mouse_hover_timeout){
            this.points.forEach(point =>{
                const distortion = this.options.mouse_hover_distortion;
                if(point.is_on_point(x,y,distortion)){
                    handler(point);
                    this.hover = now;
                }
            })
        }
    }

    public handleMovement(vx:number,vy:number):void{
        this.points[this.points.length-1].set_speed(vx,vy);
    }

    public update(width:number,height:number,vercel_s:number=5):void{
        this.points.forEach(point =>{
            point.update(width,height);
        })
        for(let x = 0; x < vercel_s; x++){
            for(let y = 0; y < this.points.length-1;y++){
                this.verlet(this.points[y],this.points[y+1],this.options.verlet_target_distance);
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

    public render(width:number,height:number):void{
        this.update(width,height,this.options.verlet_calculate_per_frame);
        this.points.forEach(point =>{
            point.render(this.ctx);
        })
    }
}

export default Rope;