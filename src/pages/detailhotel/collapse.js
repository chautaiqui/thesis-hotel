import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import "./detailhotel.style.css";
import {
  DownOutlined, UpOutlined
} from '@ant-design/icons';

export const CustomCollapse = (props) => {
  const { text = "", position = 10 } = props;
  const arrText = text.split(" ");
  const [ collapse, setCollapse ] = useState(false);
  
  useEffect(()=>{
    var _l = text.split(" ").length;
    if(position < _l) setCollapse(true);
  },[props])

  const toggle = (collapse) => {
    setCollapse(collapse);
  }
  return <Row >
    <Col span={24}>
      { collapse ? text.split(" ").slice(0, position).join(" ") + ' ...' : text}
    </Col>
    <Col span={14}>
      { collapse && <div className="show-collapse" onClick={()=>toggle(false)}>Show more <DownOutlined /></div>}
      { !collapse && <div className="show-collapse" onClick={()=>toggle(true)}>Show less <UpOutlined /></div>}
    </Col>
  </Row>
}