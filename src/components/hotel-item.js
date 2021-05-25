import React from 'react'
import { Rate } from 'antd';
import './css/hotel-item.style.css';
export const HotelItem = props => {
  const { name, address, rate, price, img, redirect = () => {} } = props;
  return (
    <div className="item">
      <img 
        src={img}
        className="img-item"
        onClick={redirect}
      />
      <p className="name" onClick={redirect}>{name}</p>
      <p className="address" onClick={redirect}>{address}</p>
      <Rate allowHalf defaultValue={rate} disabled/>
      <p className="price">VND {price}</p>
    </div>
  )
}
