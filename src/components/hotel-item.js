import React from "react";
import { Rate, Row, Col } from "antd";
import "./css/hotel-item.style.scss";
import { ImageCarousel } from "./ImageCarousel";

const defaulfHotel = {
  imgs: [
    'https://ads-cdn.fptplay.net/static/banner/2021/07/16_60f071e55140f700012e53ec.jpeg'
  ]
}


export const HotelItem = (props) => {
  const {
    hotel,
    redirect = () => {},
  } = props;

  return (
    // <div className="hotel-item">
    //   <div className="hotel-img">
    //     <img src={img} alt="hinh" onClick={redirect} />
    //   </div>
    //   <div className="hotel-body">
    //     <p className="hotel-name" onClick={redirect}>
    //       {name}
    //     </p>
    //     <Rate allowHalf defaultValue={rate} disabled />
    //     <p className="hotel-desc">{description}</p>
    //     <p className="hotel-price">
    //       {price.toLocaleString("it-IT", {
    //         style: "currency",
    //         currency: "VND",
    //       })}{" "}
    //     </p>
    //     <p className="address" onClick={redirect}>
    //       {address}{" "}
    //     </p>
    //     <p className="rating">{}</p>
    //   </div>
    // </div>
    <Row gutter={[16,16]} onClick={redirect}>
      <Col span={12}>
        <ImageCarousel img={hotel.imgs.length !== 0 ? hotel.imgs : defaulfHotel.imgs}/>
      </Col>
      <Col span={12}>
        <Row gutter={[16,0]}>
          <Col span={24} style={{fontSize: "x-large",fontWeight: 600}}>
            {hotel.name}
          </Col>
          <Col span={24}>
            <span>{hotel.address}</span>
          </Col>
          <Col span={24}>
            <Rate value={hotel.rated.avgValue} disabled/>
          </Col>
          <Col span={24}>
            <span>
              Price: {hotel.averagePrice.avgValue.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}{" "}
            </span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
