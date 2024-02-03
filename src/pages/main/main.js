import React from 'react'
import BGCanvas from '../../Components/BGCanvas/BGCanvas'
import placeholder_img from './logo192.png';
import './main.scss'

export default function Main() {

  return (
    <div>
        <BGCanvas width={500} height={500} src={placeholder_img}/>
    </div>
  )
}
