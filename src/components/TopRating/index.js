import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

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

  return (
    <Row gutter={[16, 16]}>
      {hotels.map((item, index) => {
        if (index < 6) {
          return (
            <Col span={4} sm={8} lg={4} xs={24} md={8} xl={4}>
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
      })}
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
