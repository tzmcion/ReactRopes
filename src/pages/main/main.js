import React from 'react'
import {RopeImage,RopeOptions} from '../../Components/BGCanvas'
import placeholder_img from './caution.png';
import './main.scss'

export default function Main() {

  const mouseHandler = (point,event) =>{
    //point.set_speed(Math.random()*50+50,-5);
  }

  const options = {...RopeOptions};

  return (
    <div>
        <RopeImage width={500} onHover={mouseHandler} options={options} height={500} src={placeholder_img}/>
    </div>
  )
}
