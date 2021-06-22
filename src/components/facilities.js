import React from 'react';
import { Row, Col } from 'antd';
import { WifiOutlined } from '@ant-design/icons';
export const Facilities = ({ data = [] }) => {
  return <>
    <h1>Facilities</h1>
    <Row gutter={[16,16]}>
      {
        data.map((item, index) => {
          return <Col xs={24} sm={12} key={index}>
            <div style={{display: 'inline-flex', width: '100%', justifyContent: 'space-around'}}>
              <WifiOutlined style={{display: 'flex', justifyContent: 'center',alignItems: 'center'}}/> 
              <div>{item.facility.type.name ? item.facility.type.name : ""}</div>
            </div>
          </Col>
        })
      }
    </Row>
  </>
}