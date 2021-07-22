import React, { useState, useContext, useEffect } from 'react';
import { messageError } from '../../commons';
import { getRequest } from '../../pkg/api';
import { User } from "../../pkg/reducer";
import { Row, Col } from 'antd';
import moment from 'moment';


export const History = () => {
  const [ user, dispatchUser ] = useContext(User.context);
  const [ data, setData ] = useState({data: [], history: false});
  const fetchHistory = async () => {
    if(!user._id) return;
    const res = await getRequest(`customer/${user._id}/booking`);
    if(res.success) {
      console.log(res.result);
      setData({
        data: res.result.bookings,
        history: true
      })
    } else {
      messageError("Error", res.error);
    }

  }

  useEffect(()=>{
    if(user.booked) {
      fetchHistory();
    }
  },[user])
  useEffect(()=>{
    fetchHistory();
  },[])
  const title = {
    hotel: {
      name: "Hotel"
    },
    room: {
      name: "Room",
      roomType: {
        name: "Room Type",
        price: "Price"
      },
    },
    
    bookingStart: "Booking Start",
    bookingEnd: "Booking End",
    status: "Status"
  }
  return <Row gutter={[16,16]}>
    History
  </Row>
}

const BookingItem = (props) => {
  const { booking } = props;
  return <Row>
    <Col span={3}>{booking.hotel.name}</Col>
    <Col span={3}>{booking.room.name}</Col>
    <Col span={3}>{booking.room.roomType.name}</Col>
    <Col span={3}>{booking.room.roomType.price}</Col>
    <Col span={3}>
      {booking.bookingStart.length > 14 ? moment(booking.bookingStart).format("DD/MM/YYYY") : booking.bookingStart}
    </Col>
    <Col span={3}>
      {booking.bookingEnd.length > 14 ? moment(booking.bookingEnd).format("DD/MM/YYYY") : booking.bookingEnd}
    </Col>
    <Col span={3}>{booking.status}</Col>
    <Col span={3}>Action</Col>
  </Row>
}