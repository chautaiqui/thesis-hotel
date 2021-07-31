import React, { useState, useEffect } from 'react';
import { Row, Col, Select } from 'antd';
import "./detailhotel.style.css";
import { messageError, messageSuccess } from '../../commons';
import { postMethod } from '../../pkg/api';

export const BookingInfo = (props) => {
  const { data, hotel, user, dispatch = () => {}, clearBooking = () => {} } = props;
  const { room, startDate, endDate } = data;
  const [ discount, setDiscount ] = useState(null);
  var complete = false;
  var price = hotel.averagePrice.avgValue;
  var start = "DD/MM/YYYY"; 
  var end = "DD/MM/YYYY";

  // console.log(room, startDate, endDate);
  if(room._id) {
    price = room.roomType.price;
    if(startDate) {
      start = startDate.format("DD/MM/YYYY");
    } 
    if(startDate && endDate) {
      price = endDate.diff(startDate, 'days') * room.roomType.price;
      start = startDate.format("DD/MM/YYYY");
      end = endDate.format("DD/MM/YYYY");
      complete = true;
    }
  }

  useEffect(()=>{
    setDiscount(null);
  },[room])

  const onChange = (value) => {
    var _d = price * value[0] / 100;
    var d = _d < value[1] ? _d : value[1];
    setDiscount({price: d, id: value[2]});
  }

  const createBooking = async (data) => {
    const res = await postMethod("booking/create" , data);
    if(res.success) {
      messageSuccess("Success", "Booking successful, please check it the history section!");
      // dispath user 
      dispatch({type: "BOOKED"});
    } else {
      messageError("Error", res.error);
    }
  }

  const handleClickBooking = () => {
    console.log(user)
    if(!user._id) {
      messageError(
				'Error booking',
				'You must login to use this function!'
			);
      return;
    }
    if(!room._id) {
      messageError(
				'Error booking',
				'You must select room first!'
			);
      return;
    }
    if(!startDate || !endDate) {
      messageError(
				'Error booking',
				'You must complete start date and end date!'
			);
      return;
    }
    console.log(room, startDate, endDate, discount);
    var data = {
      room: room._id,
      customer: user._id,
      bookingStart: startDate.format("DD-MM-YYYY HH:mm"),
      bookingEnd: endDate.format('DD-MM-YYYY HH:mm'),
      totalMoney: price
    }
    if(discount) {
      data = {
        ...data, voucher: discount.id, totalMoney: price - discount.price
      }
    }
    console.log(data);
    createBooking(data);
  }
  
  return <Row>
    <Col span={24} className="booking-info-pad-5">
    <strong>Price:</strong> {
        !room._id ? (
          price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          }) + " / night"
        ) : price.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })
      } 
    </Col>
    { room._id && <Col span={24} className="booking-info-pad-5">
    <strong>Room: </strong>{room.name}
    </Col>}
    { room._id && <Col span={24} className="booking-info-pad-5">
    <strong>Room type: </strong> {room.roomType.name}
    </Col>}
    { room._id && <Col span={24} className="booking-info-pad-5">
    <strong>Capacity: </strong> {room.roomType.capacity}
    </Col>}
    <Col span={24} className="booking-info-pad-5">
        <Row>
          <Col span={12} className='booking-border-left'>
          <strong>Start:</strong> <br></br>
            {start}</Col>
          <Col span={12} className='booking-border-right'>
          <strong>End:</strong> <br></br>
            {end}</Col>
        </Row>
    </Col>
    { user._id && room._id && startDate && endDate && <Col span={24} className="booking-info-pad-5">
      <strong>Voucher:</strong> <Select
        // style={{ width: "100%" }}
        placeholder="Select a voucher"
        optionFilterProp="children"
        className="select-voucher"
        options={
          !room._id? [] :user.voucher
            .filter(item => item.roomType._id === room.roomType._id && item.status === 'available')
            .map(item => ({label: item.discount + " %" , value: [item. discount, item.discountLimit, item._id]}))
        }
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      />
    </Col>}
   { discount && <Col span={24} className="booking-info-pad-5">
      <div className="booking-info-pad-5-right">
        <strong>Discount: </strong> 
        {
          discount.price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          }) 
        }
      </div>
    </Col>}
    {room._id && startDate && endDate && <Col span={24} className="booking-info-pad-5">
      <div className="booking-info-pad-5-right">
        <strong>Total: </strong> 
        {
          (discount ? price - discount.price : price).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          }) 
        }
      </div>
    </Col>}
    <Col span={24} className="booking-info-pad">
      <div className="btn-booking" onClick={handleClickBooking}>
        <strong>Booking</strong>
      </div>
    </Col>
    {user._id && room._id && <Col span={24} className="booking-info-pad-5">
      <div className="btn-clear-booking" onClick={clearBooking}>
        <strong>Clear</strong>
      </div>
    </Col>}
  </Row>
}