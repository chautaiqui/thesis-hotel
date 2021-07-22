import React from 'react';
import { Row, Col, Button } from 'antd';
import './detail.style.scss';
export const ListRoom = (props) => {
  const { rooms = [], selectRoom = () => {}, style={} } = props;
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
        return <Col span={24} key={index}>
          <RoomItem room={item} selectRoom={()=>selectRoom(item)}/>
        </Col>
      })
    }
  </Row>
}

const RoomItem = props => {
  const { room, selectRoom = () => {}, style = {} } = props;
 
  return <Row style={style}>
    <Col span={5} style={{textAlign: 'center'}}>{room.name}</Col>
    <Col span={5} style={{textAlign: 'center'}}>{room.roomType.name}</Col>
    <Col span={2} style={{textAlign: 'center'}}>{room.roomType.capacity}</Col>
    <Col span={8} style={{textAlign: 'center'}}>
      {room.roomType.price.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      })}
    </Col>
    { room._id && <Col span={4} onClick={selectRoom}>
      <div
        className="slide"
      >Select</div>
    </Col>}
  </Row>
}