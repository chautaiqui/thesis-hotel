import React, { useState, useContext } from 'react';
import { User } from '../pkg/reducer';
import { RoomItem } from './room-item';
import { Row, Col, Calendar, Select, Typography } from 'antd';
import { CalendarCustom } from './calendar-custom';
import { Facilities } from './facilities';
import { SelectVoucher } from './select-voucher';
import { BookingInfo } from './booking-info';
export const Booking = ({hotel, room}) => {
  console.log(hotel, room);
  const [ selected, setSelected ] = useState({});
  const [ booking, setBooking ] = useState({});
  const [ user ] = useContext(User.context);
  const selectRoom = (item) => {
    setSelected(item);
    setBooking(item);
  }
  const onSelectDate = (date) => {
    console.log(date);
  }
  
  return <>
    <Row gutter={[16,16]}>
      <Col xs={24} sm={8}>
        <Row gutter={[16,16]}>
          {
            room && room.map((item, index) => {
              return <Col key={index} span={12} onClick={()=>{selectRoom(item)}}><RoomItem room={item} selected={item._id === selected._id}/></Col>
            })
          }
        </Row>
      </Col>
      <Col xs={24} sm={16}>
        {selected._id && (<Row gutter={[16,16]}>
          <Col xs={24} sm={12}>
            <CalendarCustom onSelectDate={onSelectDate}/>
          </Col>
          <Col xs={24} sm={12}>
            <Facilities data={selected.facilities}/>
            {user._id && <SelectVoucher voucher={user.voucher}/>}
            <BookingInfo />
          </Col>
        </Row>)}
      </Col>
    </Row>
  </>
}
