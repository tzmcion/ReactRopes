const default_options = {
    quantity: 15, //Quantity of blocks which build the line
    pos_x: 0, //X Position of anchor of rope, if set to 0 is replaced by width of canvas divided by 2
    pos_y: 0, //Y Position of anchor of rope
    pos_ex: 10, //X offset Position of initial spawn of the image
    pos_ey: 0, //Y offset Position of initial spawn of the image
    obj_height:8, //Height of single block in the line
    obj_width:2, //Width of single block in the line
    color: "#000", //Color of the blocks creating the rope
    gravity:0.5, //Gravity strength
    air_friction: 0.99, //Emulator of air friction, strenght of movement is 99% of strenth from last frame
    wheel_blocks:false, //Flag if the blocks creating the line should be radial, if true, radius is higher value from obj_
    bounce_type:0, // Bounce can be set to bounce off the walls et cetra, still in development this option
    __control_flag:true //Used to check if options inputed are imported from this pattern
  }

  export default default_options;