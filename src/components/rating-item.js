import React from 'react';
import { Row, Col, Avatar, Rate } from 'antd';
import moment from 'moment';

export const RatingItem = ({rate}) => {
  const { comment, rating, customer, updatedAt } = rate;
  return (
    <Row gutter={[0,0]} style={{marginBottom: 30}}>
      <Col span={4}>
        <Avatar size={"large"} src={customer.img} style={{maxWidth: "100%"}}/>
      </Col>
      <Col span={18}>
          <Row>
            <Col span={24}>
              {customer.name}
            </Col>
            <Col span={24}>
              <Rate value={rating} style={{color: '#a0d911'}} disabled/>
            </Col>
            <Col span={24} style={{color: "#717171"}}>
              { moment(updatedAt).fromNow()}
            </Col>
          </Row>
      </Col>
      <Col span={24}>
        {comment}
      </Col>
    </Row>
    
  )
}