import React, { useState } from 'react';
import { RoomItem } from './room-item';
import { Row, Col, Calendar, Select, Typography } from 'antd';
import { CalendarCustom } from './calendar-custom';
export const Booking = ({hotel, room}) => {
  console.log(hotel, room);
  const [ selected, setSelected ] = useState({});
  const selectRoom = (item) => {
    setSelected(item);
  }
  const onSelectDate = (date) => {
    console.log(date);
  }
  
  return <>
    <Row gutter={[16,16]}>
      <Col span={8}>
        <Row gutter={[16,16]}>
          {
            room && room.map((item, index) => {
              return <Col key={index} span={12} onClick={()=>{selectRoom(item)}}><RoomItem room={item} selected={item._id === selected._id}/></Col>
            })
          }
        </Row>
      </Col>
      <Col span={16}>
        <Row gutter={[16,16]}>
          <Col xs={24} sm={12}>
            <CalendarCustom onSelectDate={onSelectDate}/>
          </Col>
          <Col xs={24} sm={12}>
            Booking info
          </Col>
        </Row>
      </Col>
    </Row>
  </>
}
