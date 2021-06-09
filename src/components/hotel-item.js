import React from "react";
import { Rate } from "antd";
import "./css/hotel-item.style.scss";
export const HotelItem = (props) => {
  const {
    name,
    address,
    rate,
    price,
    description,
    img,
    redirect = () => {},
  } = props;

  return (
    <div className="hotel-item">
      <div className="hotel-img">
        <img src={img} alt="hinh" onClick={redirect} />
      </div>
      <div className="hotel-body">
        <p className="hotel-name" onClick={redirect}>
          {name}
        </p>
        <Rate allowHalf defaultValue={rate} disabled />
        <p className="hotel-desc">{description}</p>
        <p className="hotel-price">
          {price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}{" "}
        </p>
        <p className="address" onClick={redirect}>
          {address}{" "}
        </p>
        <p className="rating">{}</p>
      </div>
    </div>
  );
};
