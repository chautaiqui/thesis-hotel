import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { message, Row, Col, Affix } from "antd";

import { User } from "../../pkg/reducer";
import { getRequest } from "../../pkg/api";
import { HotelHeader } from "../../components/hotel-header";
// import { Booking } from "../../components/booking1";
// import HotelRating from "../../components/HotelRating";
// import ReviewRating from "../../components/ReviewRating";
import { CustomCollapse } from "./collapse";
import "./detailhotel.style.css";
import { ListRoom } from "./list-room";
import { messageError } from "../../commons";
import { CustomCalender } from "./calendar";
import moment from "moment";
import { BookingInfo } from "./booking-info";
import { CustomEmpty } from "../../commons/components/empty";
import { BookingReviews } from "./booking-reviews";
import { Conveniences } from "./conveniences";
export const DetailHotel = (props) => {
  const [ user, dispatch ] = useContext(User.context);
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  // const [room, setRoom] = useState([]);
  const [ data, setData ] = useState({
    room: [],
    reviews: [],
    loading: true
  })
  const [ updateHotel, setUpdateHotel ] = useState(false);
  
  const [ selected, setSelected ] = useState({
    room: {},
    startDate: undefined,
    endDate: undefined
  })
  useEffect(() => {
    // console.log("-------", id)
    const fetchPost = async () => {
      const re = await getRequest("hotel", {}, [id]);
      if (!re.success) {
        message.error(re.message);
      } else {
        if (re.result.length === 0) return;
        setHotel(re.result);
      }
    };
    // if (!hotel._id) {
    // }
    fetchPost();
    // eslint-disable-next-line
  }, [id, updateHotel]);


  useEffect(() => {
    const fetchRoom = async () => {
      const re = await getRequest(`hotel/${hotel._id}/room`);
      const res = await getRequest(`booking-review/hotel/${hotel._id}`);
      if (!re.success) {
        // message.error(re.message);
        messageError("Error", re.error);
      } else {
        if (re.result.length === 0) return;
        if(res.success) {
          setData({
            room: re.result.rooms,
            reviews: res.result.reviews,
            loading: false
          })
        } else {
          setData({
            room: re.result.rooms,
            reviews: [],
            loading: false
          })
        }
        // setRoom(re.result.rooms);
      }
    };
    if (hotel._id && data.room.length === 0) {
      // fetch room
      fetchRoom();
    }
    // eslint-disable-next-line
  }, [hotel]);

  const actionChangeHotel = () => {
    setUpdateHotel(!updateHotel);
  }

  const selectRoom = (room) => {
    setSelected({
      room: room,
      startDate: undefined,
      endDate: undefined
    })

  }
  const selectStartDate = (date) => {
    setSelected({
      ...selected, startDate: date, endDate: undefined
    })
  }
  const selectEndDate = (date) => {
    setSelected({
      ...selected, endDate: date
    })
  }
  const clearBooking = () => {
    setSelected({
      room: {},
      startDate: undefined,
      endDate: undefined
    })
  }
  const flattenBookingDate = (bookings) => {
    var result = [];
    bookings.map((item, index) => {
      var start = moment(item.bookingStart);
      var end = moment(item.bookingEnd);
      var _t = start.clone();
      while (_t.isBefore(end)) {
        result.push(moment(_t.format("DD MM YYYY"), "DD MM YYYY"))
        _t = _t.clone().add(1, 'days')
      }
    })
    return result
  }
  const flattenBookingEndDate = (bookings) => {
    var _t = flattenBookingDate(bookings);
    if(selected.startDate) {
      var start = moment();
      var end = selected.startDate.clone().add(1, "days");
      var _temp = start.clone();
      while (_temp.isBefore(end)) {
        _t.push(moment(_temp.format("DD MM YYYY"), "DD MM YYYY"))
        _temp = _temp.clone().add(1, 'days')
      }
    }
    return _t
  }
  // if(selected.room.bookings) {
  //   console.log(selected.room.bookings)
  //   var r = flattenBookingDate(selected.room.bookings);
  //   console.log(r)
  // }
  console.log(selected)
  return (
    <>
      {!data.loading ? (
        <div>
          <HotelHeader hotel={hotel} user={user._id ? {login: true, _id: user._id} : {login: false, _id: ""}} update={actionChangeHotel}/>
          <Row gutter={[16,16]} style={{marginTop: 20}} >
            <Col span={16}>
              <h4>Description</h4>
              {
                hotel.description && <CustomCollapse text={hotel.description} position={20}/>
              }
              {
                hotel.conveniences.length !== 0 && <Conveniences data={hotel.conveniences}/>
              }
              <div>
                <h4>Select Room</h4>
                { data.room.length !== 0 && <ListRoom 
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    // boxShadow: "rgb(0 0 0 / 10%) 3px 3px 3px",
                    marginTop: 20,
                    marginBottom: 20,
                    padding: 5,
                    border: "1px solid #DDDDDD",
                    boxShadow: "0px 6px 16px rgb(0 0 0 / 12%)"
                  }} 
                  rooms={data.room} 
                  selectRoom={selectRoom}
                  selected={selected}
                  />
                }
                <h4>Select Date</h4>
                <Row gutter={[16,16]}>
                  <Col xs={24} sm={12}>
                    <CustomCalender 
                      title={"Check-in"} 
                      disableListDate={selected.room.bookings ? flattenBookingDate(selected.room.bookings): []}
                      selectedDate={selectStartDate}
                    />
                  </Col> 
                  <Col xs={24} sm={12}>
                    <CustomCalender 
                      title={"Check-out"} 
                      disableListDate={selected.room.bookings ? flattenBookingEndDate(selected.room.bookings): []}
                      selectedDate={selectEndDate}
                    />
                  </Col>
                </Row>
              </div>
              <h4>Where you’ll be</h4>
              <div style={{ marginTop: 20 }}>
                <div className="detail-decr">
                  <p>
                    <img
                      src="https://res.cloudinary.com/fpt-telecom/image/upload/v1621972432/ife6wabz6l5jrzqoagby.png"
                      alt="lct"
                      style={{ height: "24px" }}
                    />
                    {`${hotel.street}, ${hotel.ward}, ${hotel.district}, ${hotel.province}`}
                  </p>
                  <iframe
                    title="map"
                    loading="lazy"
                    allowfullscreen
                    style={{ height: "300px", width: "100%", border: "none" }}
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDw1VghHA44aPt_JcYB7ac29AKDJja1OgM&q=${hotel.street},${hotel.ward}+${hotel.district}+${hotel.province}`}
                  ></iframe>
                </div>
              </div>
              {/* <BookingReivews /> */}
              <BookingReviews reviews={data.reviews}/>
            </Col>
            <Col span={8} style={{position: 'relative'}}>
              <Affix offsetTop={10}>
                <div style={{
                  width: "100%",
                  padding: 5,
                  border: "1px solid #DDDDDD",
                  boxShadow: "0px 6px 16px rgb(0 0 0 / 12%)",
                  borderRadius: 10
                }}>
                  <BookingInfo data={selected} hotel={hotel} user={user} dispatch={dispatch} clearBooking={clearBooking}/>
                </div>
              </Affix>
            </Col>
          </Row>
          
          {/* <Booking hotel={hotel} room={room} />
          <Divider>Review</Divider>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              {user._id ? <HotelRating hotelId={hotel._id} user={user} /> : ""}
            </Col>
            <Col span={12}>
              <ReviewRating hotelId={hotel._id} />
            </Col>
          </Row> */}
        </div>
      ) : <CustomEmpty title={"Loading"}/>
      }
    </>
  );
};
