import React from 'react';
import { Row, Col } from 'antd';
import { RatingItem } from '../../components/rating-item';

export const BookingReviews = (props) => {
  const { reviews } = props;
  console.log(reviews) 
  return reviews.length !== 0 ? <Row gutter={[16,16]} style={{ marginTop: 20}}>
    <Col span={24}>
      <h4>Review by customer is booked</h4>
    </Col>
    {
      reviews.map(item => {
        return <Col xs={24} sm={24} md={24}>
          <RatingItem rate={
            {
              comment: item.review, 
              rating: item.rating, 
              customer: item.customer, 
              updatedAt: item.updatedAt
            }
          }/>
        </Col>
      })
    }
  </Row> : <div></div>
}