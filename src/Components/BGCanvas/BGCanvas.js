import React, { useEffect, useState, useRef} from 'react'
import Canvas_manager from '../../Utils/CanvasManager/cnavas_manager'
import default_options from './Options.js'
import { to_blob } from '../../Utils/FileReader';

/**
 * Renders an image attached to 'ropes'
 * @param {path} src
 * @param {number} width width of canvas, rerenders on change
 * @param {height} height height of canvas, rerenders on change
 * @param {Object} options options, please see the README
 * @returns React Component
 */
export default function BGCanvas({src,width,height,options = default_options}) {

  const canvas_ref = useRef(null);
  const [dimensions,set_dimensions] = useState({width:width,height:height});
  const [file_blob,set_file_blob] = useState(null);
  const [animator,set_animator] = useState(null);

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

  const handleMouseMove = (event) =>{
    const x = event.clientX - canvas_ref.current.getBoundingClientRect().left;
    const y = event.clientY - canvas_ref.current.getBoundingClientRect().top;
    animator && animator.handleMouseMove(x,y);
  }


  return (
    <canvas ref={canvas_ref} onMouseMove={handleMouseMove} width={dimensions.width} height={dimensions.height} className='BGCanvas'>BGCanvas</canvas>
  )
}
