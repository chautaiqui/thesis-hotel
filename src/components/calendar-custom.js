import React from 'react';

import { Calendar, Row, Col, Select } from 'antd';

export const CalendarCustom = ({disableDate, onSelectDate}) => {
  
  const getListData = (value, attendance) => {
    var listData;
    var d = attendance.find(item => item.format('DD-MM-YYYY')=== value.format('DD-MM-YYYY'));
    if (d) {
      listData = [
        { type: 'Yes', content: 'isAttendance' }
      ];
    } else {
      listData = []
    }
    return listData || [];
  }
  
  const dateCellRender = (value, disableDate) => {
    // const listData = getListData(value, attendance);
    // return (<div className="selected">
    //   <ul className="events">
    //     {listData.map(item => (
    //       <li key={item.content}>
    //         <Badge status={item.type} text={item.content} />
    //       </li>
    //     ))}
    //   </ul>
    //   </div>);
  }
  
  return <Calendar 
    headerRender={renderHeader}
    dateCellRender={(v)=>{
      return dateCellRender(v, disableDate)
    }}
    fullscreen={false}
    onSelect={onSelectDate}
  />
}

const renderHeader = ({ value, type, onChange, onTypeChange }) => {
  const start = 0;
  const end = 12;
  const monthOptions = [];

  const current = value.clone();
  const localeData = value.localeData();
  const months = [];
  for (let i = 0; i < 12; i++) {
    current.month(i);
    months.push(localeData.monthsShort(current));
  }

  for (let index = start; index < end; index++) {
    monthOptions.push(
      <Select.Option className="month-item" key={`${index}`}>
        {months[index]}
      </Select.Option>,
    );
  }
  const month = value.month();

  const year = value.year();
  const options = [];
  for (let i = year - 10; i < year + 10; i += 1) {
    options.push(
      <Select.Option key={i} value={i} className="year-item">
        {i}
      </Select.Option>,
    );
  }
  return (
    <div style={{ padding: 8 }}>
      {/* <Typography.Title level={4}>History</Typography.Title> */}
      <Row gutter={8}>
        <Col>
          <Select
            size="small"
            dropdownMatchSelectWidth={false}
            className="my-year-select"
            onChange={newYear => {
              const now = value.clone().year(newYear);
              onChange(now);
            }}
            value={String(year)}
          >
            {options}
          </Select>
        </Col>
        <Col>
          <Select
            size="small"
            dropdownMatchSelectWidth={false}
            value={String(month)}
            onChange={selectedMonth => {
              const newValue = value.clone();
              newValue.month(parseInt(selectedMonth, 10));
              onChange(newValue);
            }}
          >
            {monthOptions}
          </Select>
        </Col>
      </Row>
    </div>
  );
}