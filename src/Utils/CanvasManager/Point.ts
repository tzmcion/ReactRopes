import { options_type } from "../../Options";

class Point{
    private px:number
    private py:number
    protected rotation:number
    constructor(
        protected x:number,
        protected y:number,
        vx:number,
        vy:number,
        protected options:options_type,
        protected is_static:boolean = false){
            this.px = x - vx;
            this.py = y - vy;
            this.rotation = 0;
            this.render = this.render.bind(this);
    }

    public setRotation(rotation:number):void{
        this.rotation = rotation;
    }

    public set_y_size(size:number):void{
        this.options.obj_height = size;
    }

    public get_position():{x:number,y:number}{
        return {
            x:this.x,
            y:this.y
        }
    }

    public set_position(x:number,y:number){
        if(this.is_static)return;
        this.x = x;
        this.y = y;
    }

    public update(width:number,height:number):void{
        if(this.is_static)return;
        const {air_friction,gravity,img_weight,bounce_type} = this.options;
        const vx = ((this.x - this.px) * air_friction)
        const vy = ((this.y - this.py) * air_friction) + gravity*img_weight;
        this.px = this.x;
        this.py = this.y;
        this.x += vx;
        this.y += vy;
        let wb:boolean = false;
        switch(bounce_type){
            case -3:
                this.celling_bounce(vy);
                break;
            case -2:
                wb = this.wall_bounce(width,vx);
                break;
            case -1:
                this.ground_bounce(height,vx,vy,wb);
                break;
            default:
                break;
        }
    }

    public is_on_point(x:number,y:number,distortion:number):boolean{
        const real_x = this.x;
        const real_y = this.y;
        if(x > real_x - distortion && x < real_x + this.options.obj_width + distortion){
            if(y > real_y - distortion && y < real_y + this.options.obj_height + distortion){
                return true;
            }
        }
        return false;
    }

    public render(ctx:CanvasRenderingContext2D):void{
        if(!this.options)return;
        const {radial_blocks,color,obj_width,obj_height} = this.options;
        if(radial_blocks){
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.x,this.y,obj_width,0,Math.PI*2);
            ctx.fill();
            ctx.closePath();
            return;
        }
        ctx.save();
        ctx.fillStyle = color;
        ctx.translate(this.x + obj_width / 2, this.y + obj_height / 2);
        ctx.rotate(this.rotation);
        ctx.fillRect(-obj_width / 2, -obj_height / 2, obj_width, obj_height);
        ctx.restore()
    }

    public set_speed(vx:number = 0,vy:number=0):void{
        this.px += vx;
        this.py += vy;
    }

    private wall_bounce(width:number,vx:number):boolean{
        let of_wall_bounce = false;
        const {obj_width} = this.options
        if(this.x >= width-obj_width)
        {
            this.x = width-obj_width;
            this.px = width - obj_width + vx;
            of_wall_bounce = true;
        }
        if(this.x < 0+obj_width){
            this.x = 0+obj_width;
            this.px = vx + obj_width;
            of_wall_bounce = true;
        }
        return of_wall_bounce;
    }

    private celling_bounce(vy:number):void{
        const {obj_height} = this.options;
        if(this.y < 0 + obj_height ){
            this.y = obj_height;
            this.py = obj_height - (vy)*this.options.bounce;
        }
    }

    private ground_bounce(height:number,vx:number,vy:number,wb:boolean){
        const {obj_height} = this.options;
        if(this.y >= height-obj_height){
            this.y = height-obj_height;
            this.py = height-obj_height+vy*this.options.bounce;
            if(!wb)
            this.px = this.x - (vx*this.options.friction);
        }
    }
}

class EndPoint extends Point{
    private image:HTMLImageElement | undefined
    constructor(x:number,y:number,vx:number,vy:number,options:options_type,is_static:boolean = false,image:string = ""){
        super(x,y,vx,vy,options,is_static);
        if(is_static)return;
        this.image = new Image(this.options.img_size_x,this.options.img_size_y);
        this.image.src = image;
    }

    public override render(ctx: CanvasRenderingContext2D): void {
        if(this.is_static)Point.prototype.render(ctx);
        this.x -= this.options.img_offset_x;
        this.y -= this.options.img_offset_y;
        ctx.save();
        ctx.fillStyle = this.options.color;
        ctx.translate(this.x + this.options.img_size_x / 2, this.y + this.options.img_size_y / 2);
        ctx.rotate(this.rotation);
        if(this.image)
        ctx.drawImage(this.image,-this.options.img_size_x / 2, -this.options.img_size_y / 2, this.options.img_size_x, this.options.img_size_y);
        ctx.restore()
        this.x += this.options.img_offset_x;
        this.y += this.options.img_offset_y;
    }

    public override is_on_point(x: number, y: number, distortion: number): boolean {
        const real_x = this.x - this.options.img_offset_x;
        const real_y = this.y - this.options.img_offset_y;
        if(x > real_x - distortion && x < real_x + this.options.img_size_x + distortion){
            if(y > real_y - distortion && y < real_y + this.options.img_size_y + distortion){
                return true;
            }
        }
        return false;
    }
}

export {Point,EndPoint};