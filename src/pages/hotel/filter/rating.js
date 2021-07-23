import React, { useState, useEffect } from 'react';
import { Dropdown, Button, Icon, RangeSlider, Slider, InputNumber, Form, InputGroup, FormGroup,
  ControlLabel, FormControl, Checkbox, CheckboxGroup } from 'rsuite';

export const Rating = (props) => {
  const { appendQuery= () => {}, clearQuery=()=>{}, query={} } = props;
  const [ cur, setCur ] = useState("btn-filter");
  const toogleRate = (number) => {
    appendQuery({
      rating: number
    })
  }
  useEffect(()=>{
    if(query.rating) setCur("btn-filter have-query");
    else {
      setCur("btn-filter");
    }
  },[props])
  return <Dropdown
    title={<div style={{width: "100%"}}> Rating</div>}
    style={{width: "100%"}}
    className="star-select filter-dropdown"
    renderTitle={children => {
      return <Button className={cur}>{children}</Button>;
    }}
  >
    <Dropdown.Item onClick={()=>toogleRate(1)}>
      1 <Icon icon="star" /> 
    </Dropdown.Item>
    <Dropdown.Item onClick={()=>toogleRate(2)}>
      2 <Icon icon="star" /> 
    </Dropdown.Item>
    <Dropdown.Item onClick={()=>toogleRate(3)}>
      3 <Icon icon="star" /> 
    </Dropdown.Item>
    <Dropdown.Item onClick={()=>toogleRate(4)}>
      4 <Icon icon="star" /> 
    </Dropdown.Item>
    <Dropdown.Item onClick={()=>toogleRate(5)}>
      5 <Icon icon="star" /> 
    </Dropdown.Item>
  </Dropdown>
}