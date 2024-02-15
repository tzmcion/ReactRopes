import React from 'react'
import {RopeImage, RopeOptions} from 'react-image-rope';
import placeholder_img from './caution.png';
import './main.scss'

export default function Main() {

  const options = {...RopeOptions};

  const onPointHover = (point) =>{
    point.set_speed(Math.random() > 0.5 ? -3: 3,15);
    console.log(point);
  }

  options.auto_movement_detection = false;
  options.mouse_hover_timeout = 2000;
  options.gravity = 0.2;

  return (
    <div>
        <RopeImage width={500} height={500} onHover={onPointHover} options={options} src={placeholder_img}/>
        {/* <RopeImage width={500} onHover={mouseHandler} options={options} height={500} src={placeholder_img}/> */}
    </div>
  )
}
