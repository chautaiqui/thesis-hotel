import { React, useState, useEffect } from "react";
import { getRequest } from "../../pkg/api";

import { useLocation } from "react-router-dom";
import { message } from "antd";
import { ImgCarousel } from "../../components/carousel";
import { Booking } from "../../components/booking";
import "./hotel.style.css";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const DetailHotel = (props) => {
  const query = useQuery();
  const [hotel, setHotel] = useState({});
  const [room, setRoom] = useState([]);

  console.log(query.get("id"));

  useEffect(() => {
    const fetchPost = async () => {
      const re = await getRequest("hotel", {}, [query.get("id")]);
      console.log(re);
      if (!re.success) {
        message.error(re.message);
      } else {
        if (re.result.length === 0) return;
        setHotel(re.result);
      }
    };
    if (!hotel._id) {
      fetchPost();
    }
  }, [query]);

  useEffect(() => {
    const fetchRoom = async () => {
      const re = await getRequest(`hotel/${hotel._id}/room`);
      console.log(re);
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
  }, [hotel]);
  console.log(hotel);
  return (
    <>
      {query.get("id") ? (
        <div>
          {hotel.imgs && <ImgCarousel imgs={hotel.imgs} />}
          <div style={{ marginTop: 20 }}>
            <h1 style={{ fontWeight: "bolder" }}>{hotel.name}</h1>
            <div className="detail-decr">
              <img
                src="https://res.cloudinary.com/fpt-telecom/image/upload/v1621972432/ife6wabz6l5jrzqoagby.png"
                alt="lct"
              />
              <p>{`${hotel.street} ${hotel.ward} ${hotel.district} ${hotel.province}`}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${hotel.street}+${hotel.ward}+${hotel.district}`}
                className="view-map"
                target="_blank"
              >
                <mark>View map</mark>
              </a>
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
          <Booking hotel={hotel} room={room} />
        </div>
      ) : (
        <h1>Page not found</h1>
      )}
    </>
  );
};
