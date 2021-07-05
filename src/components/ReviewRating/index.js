import React, { useState, useEffect } from "react";
import { List, message, Avatar, Rate } from "antd";

import { getRequest } from "../../pkg/api";
import "./styles.scss";

const ReviewRating = ({ hotelId }) => {
  const [ratings, setRatings] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      const getData = async () => {
        const res = await getRequest(`/hotel/${hotelId}/rating`);
        if (!res.success) console.log(message.error);
        else {
          setRatings(res.result.ratings);
        }
      };
      getData();
    }, 1000);
  }, [hotelId]);
  console.log({ ratings });

  return (
    <div className="review-rating">
      {ratings.map((item) => {
        return (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.customer.img} />}
              title={
                <a href="#">
                  {item.customer.name} <Rate disabled value={item.rating} />
                </a>
              }
              description={item.comment}
            />
          </List.Item>
        );
      })}
    </div>
  );
};

export default ReviewRating;
