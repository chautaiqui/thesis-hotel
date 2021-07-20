import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Divider, message, Row, Col } from "antd";

import { User } from "../../pkg/reducer";
import { getRequest } from "../../pkg/api";
import { HotelHeader } from "../../components/hotel-header";
import { Booking } from "../../components/booking1";
import HotelRating from "../../components/HotelRating";
import ReviewRating from "../../components/ReviewRating";
import "./detailhotel.style.css";

export const DetailHotel = (props) => {
  const [ user, dispatch ] = useContext(User.context);
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const [room, setRoom] = useState([]);
  const [ updateHotel, setUpdateHotel ] = useState(false);
  
  useEffect(() => {
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
      if (!re.success) {
        message.error(re.message);
      } else {
        if (re.result.length === 0) return;
        setRoom(re.result.rooms);
      }
    };
    if (hotel._id && room.length === 0) {
      // fetch room
      fetchRoom();
    }
    // eslint-disable-next-line
  }, [hotel]);

  const actionChangeHotel = () => {
    setUpdateHotel(!updateHotel);
  }
  return (
    <>
      {id ? (
        <div>
          <HotelHeader hotel={hotel} user={user._id ? {login: true, _id: user._id} : {login: false, _id: ""}} update={actionChangeHotel}/>
          <div style={{ marginTop: 20 }}>
            {/* <h1 style={{ fontWeight: "bolder" }}>{hotel.name}</h1> */}
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
            <div>
              <h3
                style={{
                  fontWeight: "bolder",
                  textAlign: "start",
                  marginTop: 10,
                }}
              >
                Facilities
              </h3>
            </div>
          </div>
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
      ) : (
        <h1>Page not found</h1>
      )}
    </>
  );
};
