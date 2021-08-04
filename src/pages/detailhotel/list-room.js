import React, { useState } from 'react';
import { Row, Col } from 'antd';
import './detail.style.scss';
export const ListRoom = (props) => {
  const { rooms = [], selectRoom = () => {}, style={}, selected = {} } = props;
  return <Row gutter={[16,16]} style={style}>
    <Col span={24}>
      <RoomItem 
      room={{
        name: "Name",
        roomType: {
          name: "Room Type",
          capacity: "Capacity",
          price: "Price"
        }
      }} 
      style={{
        borderBottom: "1px solid"
      }}/>
    </Col>
    {
      rooms.map((item, index)=> {
        const check = selected.room._id ? (selected.room._id === item._id) : false;
        return <Col span={24} key={index}>
          <RoomItem room={item} selectRoom={()=>{
            selectRoom(item);
          }} selected={check}/>
        </Col>
      })
    }
  </Row>
}

const RoomItem = props => {
  const { room, selectRoom = () => {}, style = {}, selected = false } = props;
  return <Row style={style}>
    <Col span={5} style={{textAlign: 'center', overflow: "hidden",textOverflow: "ellipsis"}}>{room.name}</Col>
    <Col span={5} style={{textAlign: 'center', overflow: "hidden",textOverflow: "ellipsis"}}>{room.roomType.name}</Col>
    <Col span={2} style={{textAlign: 'center', overflow: "hidden",textOverflow: "ellipsis"}}>{room.roomType.capacity}</Col>
    <Col span={8} style={{textAlign: 'center', overflow: "hidden",textOverflow: "ellipsis"}}>
      {room.roomType.price.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      })}
    </Col>
    { room._id && <Col span={4} onClick={selectRoom}>
      <div
        className="slide"
        style={{background: selected ? "#57ca8b" : "#f0f0f0", overflow: "hidden",textOverflow: "ellipsis"}}
      >Select</div>
    </Col>}
  </Row>
}