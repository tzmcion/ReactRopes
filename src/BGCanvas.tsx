import { useEffect, useState, useRef} from 'react'
import Canvas_manager from './Utils/CanvasManager/canvas_manager'
import {default_options} from './Options'
import { to_blob } from './Utils/FileReader';
import { Point } from './Utils/CanvasManager/Point';

type props = {
    src:string,
    width:number,
    height:number,
    onHover?: (point:Point, event:Event) => void,
    options?: typeof default_options
}


export default function BGCanvas({src,width,height,onHover = () =>{},options = default_options}:props) {

  const canvas_ref = useRef<HTMLCanvasElement>(null);
  const [dimensions,set_dimensions] = useState<{width:number,height:number}>({width:width,height:height});
  const [file_blob,set_file_blob] = useState<string>();
  const [animator,set_animator] = useState<Canvas_manager>();

  useEffect(()=>{
    if(!Object.keys(options).includes('__control_flag')){
      throw new Error("Options provided is not valid options type, please import options from our package and change them accordingly");
    }
  },[options])

  useEffect(()=>{
    set_dimensions({width:width,height:height});
  },[width,height])

  useEffect(()=>{
    to_blob(src).then(blob =>{
      set_file_blob(blob);
    })
  },[src])

  useEffect(()=>{
    if(file_blob && canvas_ref.current && options){
      set_animator(new Canvas_manager(canvas_ref.current,dimensions.width,dimensions.height,file_blob,options));
    }
  },[dimensions,file_blob,options]);

  useEffect(()=>{
    return () => {animator && animator.destroy();}
  },[animator])

  const handleMouseMove = (event:any) =>{
    if(canvas_ref.current){
        const x = event.clientX - canvas_ref.current.getBoundingClientRect().left;
        const y = event.clientY - canvas_ref.current.getBoundingClientRect().top;
        animator && animator.handleMouseMove(x,y,(point:Point)  =>{onHover(point,event)});
    }
  }

  useEffect(()=>{
      var interval:any = 0;
      if(options.auto_movement_detection){
        if(animator && canvas_ref.current){
          animator.set_initial_pos(canvas_ref.current.getBoundingClientRect().left,canvas_ref.current.getBoundingClientRect().top);
          interval = setInterval(()=>{
            if(canvas_ref.current)
            animator.set_last_pos();
          },options.movement_detection_delay)
        }
      }
      return () =>{if(interval)clearInterval(interval);}
  },[animator,options])


  return (
    <canvas ref={canvas_ref} onMouseMove={handleMouseMove} width={dimensions.width} height={dimensions.height} className='BGCanvas'>BGCanvas</canvas>
  )
}
