import React from 'react';
import { Dropdown, Button, Icon, RangeSlider, Slider, InputNumber, Form, InputGroup, FormGroup,
  ControlLabel, FormControl, Checkbox, CheckboxGroup } from 'rsuite';

export const MoreFilter = (props) => {
  return <Dropdown
    title={<div style={{width: "100%"}}> More Filter</div>}
    style={{width: "100%"}}
    className="filter-dropdown"
    renderTitle={children => {
      return <Button className="btn-filter">{children}</Button>;
    }}
  >
    <div style={{width: 300, padding: "10px 10px 10px 10px"}} >
      <CheckboxGroup name="checkboxList">
        <p style={{textAlign: 'center'}}>Conveniences</p>
        <Checkbox value="hồ bơi">Hồ Bơi</Checkbox>
        <Checkbox value="sân bóng đá">Sân bóng đá</Checkbox>
        <Checkbox value="bar">Bar</Checkbox>
        <Checkbox value="tennis">Tennis</Checkbox>
        <Checkbox value="buffet">Buffet</Checkbox>
        <Checkbox value="bồn tắm">Bồn tắm</Checkbox>
        <Checkbox value="ban công">Ban công</Checkbox>
        <Checkbox value="tv">TV</Checkbox>
        <Checkbox value="máy giặt">Máy giặt</Checkbox>
        <Checkbox value="bãi giữ xe">Bãi giữ xe</Checkbox>
        <Checkbox value="khu vực bếp">Khu vực bếp</Checkbox>
      </CheckboxGroup>
      <Button appearance="primary" style={{float: "right"}}>Apply</Button>
    </div>
  </Dropdown>
}