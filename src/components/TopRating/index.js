import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import Slider from "react-slick";
import "./styles.scss";
import { getRequest } from "../../pkg/api";

const TopRating = () => {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    const getHotels = async () => {
      const res = await getRequest("/hotel/top-rating");
      setHotels(res.result.hotels);
    };
    getHotels();
    // eslint-disable-next-line
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 0,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 950,
        settings: {
          initialSlide: 0,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Row gutter={[16, 16]}>
      {/* {hotels.map((item, index) => {
        if (index < 6) {
          return (
            <Col xs={} sm={} md={} lg={} xl={4}>
              <Card
                key={index}
                img={item.imgs[0]}
                avgValue={item.averagePrice.avgValue}
                rated={item.rated.avgValue}
                hotelName={item.name}
                id={item._id}
                amountRating={item.rated.amount}
              />
            </Col>
          );
        }
      })} */}
      <Col span={24}>
        <Slider {...settings}>
          {
            hotels.map((item, index)=>(
              <Card
                key={index}
                img={item.imgs[0]}
                avgValue={item.averagePrice.avgValue}
                rated={item.rated.avgValue}
                hotelName={item.name}
                id={item._id}
                amountRating={item.rated.amount}
              />
            ))
          }
        </Slider>
      </Col>
    </Row>
  );
};

const Card = ({ img, avgValue, rated, amountRating, id, hotelName }) => {
  return (
    <a href={`/hotel/${id}`} className="card-hotel-rating">
      <div className="img">
        <img alt="hinh" src={img} />
      </div>
      <div className="body">
        <p className="name">{hotelName}</p>
        <p className="price">
          Starting from{" "}
          {avgValue.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </p>
        <div className="rating">
          <div className="point">
            <div className="pointt">{parseFloat(rated).toFixed(1)}</div>
          </div>
          <p className="amount">{amountRating} reviews</p>
        </div>
      </div>
    </a>
  );
};

export default TopRating;
