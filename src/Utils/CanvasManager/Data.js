const ropes = [{
    quantiy:100,
    positions:{
        pos_x:400,
        pos_y:-20,
        pos_ex:-10,
        pos_ey:250
    },
    options:{
        color:"#61EF65",
        is_static_end:true,
        gravity:0.4,
        obj_height:20,
        obj_width:10,
        air_friction:0.95,
        bounce_type:0
    }
},{
    quantiy:100,
    positions:{
        pos_x:-20,
        pos_y:20,
        pos_ex:600,
        pos_ey:-10
    },
    options:{
        color:"orange",
        is_static_end:true,
        gravity:0.4,
        obj_height:20,
        obj_width:10,
        air_friction:0.95,
        bounce_type:0
    }
}];

export default ropes;