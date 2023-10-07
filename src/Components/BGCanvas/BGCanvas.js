import React, { useEffect, useState, useRef, useCallback } from 'react'
import Canvas_manager from '../../Utils/CanvasManager/cnavas_manager'
import useDimensions from '../../hooks/useDimensions'

import './BGCanvas.scss'
/**
 * Component is background Canvas for the first page
 * @returns React Component
 */
export default function BGCanvas() {
  const dimensions = useDimensions();
  const canvas = useRef(null);
  const frameId = useRef(0);
  const [manager,setManager] = useState(null);

  const render = useCallback(()=>{
    manager.render();
    frameId.current = window.requestAnimationFrame(render);
  },[manager])

  const mouseMove = useCallback((event)=>{
    const x = event.clientX;
    const y = event.clientY;
    manager.handleMouseMove(x,y);
  },[manager])

  useEffect(()=>{
      setManager(new Canvas_manager(canvas.current,dimensions.width,dimensions.height));
  },[dimensions])

  useEffect(()=>{
      if(manager){
        window.requestAnimationFrame(render);
        window.addEventListener('mousemove',mouseMove);
      }
      return () => {window.cancelAnimationFrame(frameId.current);window.removeEventListener('mousemove',mouseMove)}
  },[manager,mouseMove,render])



  return (
    <canvas ref={canvas} width={dimensions.width} height={dimensions.height} className='BGCanvas'>BGCanvas</canvas>
  )
}
