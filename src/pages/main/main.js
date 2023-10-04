import {useRef,useEffect, useState} from 'react'
import canvas_manager from '../../components/cnavas_manager';
import './main.scss'

export default function Main() {
    const c_ref = useRef(null);
    const [manager,setManager] = useState(null);

    useEffect(()=>{
      if(c_ref.current !== undefined && manager === null){
        setManager(new canvas_manager(c_ref.current,500,500));
      }
    },[manager]);

    useEffect(()=>{
      if(manager !== null){
        window.requestAnimationFrame(animate);
        c_ref.current.addEventListener('mousedown',mouseClick)
        c_ref.current.addEventListener('mousemove',mouseMove)
      }
    },[manager])

    const mouseClick = (event) => {
      if(manager){
        manager.handleMouseClick(event.clientX - event.target.offsetLeft,event.clientY - event.target.offsetTop);
      }
    }

    const mouseMove = (event) =>{
      if(manager){
        manager.handleMouseMove(event.clientX - event.target.offsetLeft,event.clientY - event.target.offsetTop);
      }
    }
 
    const animate = ()=>{
      manager.render();
      window.requestAnimationFrame(animate);
    }

  return (
    <div>
        <canvas ref={c_ref} width={500} height={500}></canvas>
    </div>
  )
}
