const default_options = {
    quantity: 15, //Quantity of blocks which build the line
    pos_x: 0, //X Position of anchor of rope, if set to 0 is replaced by width of canvas divided by 2
    pos_y: 0, //Y Position of anchor of rope
    pos_ex: 10, //X offset Position of initial spawn of the image
    pos_ey: 0, //Y offset Position of initial spawn of the image
    obj_height:6, //Height of single block in the line
    obj_width:2, //Width of single block in the line
    img_size_x: 70, //X size of the image
    img_size_y:70, // Y size of the image
    img_offset_x: 0, // X offset of the image attached to the last block of the rope, if 0 set to half of the width;
    img_offset_y: 0, // Y offset of image attached to the last block of the rope, if 0 then is calculated to 80% of immage
    img_weight:1, // Weight of the image
    img_rotate_target_index:0, // Reference point which img rotation is based of, can be from range 0 to quantity-2
    color: "#000", //Color of the blocks creating the rope, try transparent ;)
    gravity:0.5, //Gravity strength, the higher the number, the gigher is gravity pulling down force per frame
    air_friction: 0.99, //Emulator of air friction, strenght of movement is 99% of strenth from last frame
    friction:0.85, //Fricition on the ground in case used by bounce type
    radial_blocks:false, //Flag if the blocks creating the line should be dots, if true, radius is higher value from obj_
    bounce_type:0, // Bounce can be set to bounce off the walls et cetra, still in development this option
    bounce:0.95, //Strength of a bounce, default: boucned object has 95% of speed in the opposite direction
    verlet_calculate_per_frame: 4,  // how many times vercel updates per frame, more means more calculations and more 'realism'
    verlet_target_distance:3, // what is the optimum distance between blocks in vercel calculations
    verlet_extend_length:false, // Extends obj_height to fill any gaps between objects building rope
    mouse_hover_distortion:1,  // how big is the radius of mouse interaction with the block, as strictly on the block might be difficult to achieve
    mouse_hover_timeout:1000, //  timeout between captures of mouse
    auto_movement_detection:true, // Automatically detects the movement of canvas (using css) and adjust the momentum
    movement_detection_delay:40, // Delay of the detection, must stay over 100 to work properly
    movement_detection_force:0.3, // Multiplier for movement detection force 
    __control_flag:true //Used to check if options inputed are imported from this pattern
  }

  export default default_options;