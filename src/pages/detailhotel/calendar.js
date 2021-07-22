import React from 'react';
import { Calendar, Select, Radio, Col, Row, Typography, Button } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import moment from 'moment';

export const CustomCalender = (props) => {
  const { title = "", disableListDate = [], selectedDate = () => {} } = props;
  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  function disabledDate(currentDate) {
    return currentDate < moment().startOf('day') 
      || disableListDate.map(item => currentDate.format("DD MM YYYY") === item.format("DD MM YYYY")).reduce(function(c, n){
        return c || n
      }, false);
  }
  return <Calendar
    fullscreen={false}
    defaultValue={undefined}
    headerRender={({ value, type, onChange, onTypeChange }) => {
      const changeMonth = (increate) => {
        const newValue = value.clone();
        increate ? onChange(newValue.add(1, "months")) : onChange(newValue.subtract(1, "months"))
      }
      return (
        <div style={{ padding: 8 }}>
          <Typography.Title level={4}>{title}</Typography.Title>
          <Row gutter={8}>
            <Col span={4}>
              <Button icon={<LeftOutlined />} size={"small"} onClick={()=>changeMonth(false)}/>
            </Col>
            <Col span={16} style={{textAlign: "center"}}>
              {value.format("MMMM YYYY")}
            </Col>
            <Col span={4}>
              <Button icon={<RightOutlined />} size={"small"} onClick={()=>changeMonth(true)}/>
            </Col>
          </Row>
        </div>
      );
    }}
    onSelect={selectedDate}
    disabledDate={disabledDate}
  />
}