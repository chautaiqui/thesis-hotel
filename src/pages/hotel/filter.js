import React, { useState, useEffect } from 'react';
import { Row, Col, Grid, Menu, Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { SearchText } from './search';
import "./hotel.style.scss";
import { Dropdown, Button, Icon, RangeSlider, Slider, InputNumber, Form, InputGroup, FormGroup,
   ControlLabel, FormControl, Checkbox, CheckboxGroup } from 'rsuite';
const { useBreakpoint } = Grid;
const breakPoint = (obj) => {
  const arr = Object.entries(obj).reverse();
  const temp = arr.filter((item) => item[1] === true);
  return temp[0] ? temp[0][0] : "xxl";
};
export const Filter = (props) => {
  const [ collapsed, setCollapsed ] = useState(false);
  const [ value, setValue ] = useState({min: 0, max: 5})
  const [ visible, setVisible ] = useState(false);
  const screens = useBreakpoint();
  const breakP = breakPoint(screens);

  useEffect(()=>{
    switch (breakP) {
      case 'xs':
        setCollapsed(true);
        return;
      case 'sm':
        setCollapsed(true);
        return;
      case 'md':
        setCollapsed(false);
        return;
      case 'lg':
        setCollapsed(false);
        return;
      case 'xl':
        setCollapsed(false);
        return;
      case 'xxl':
        setCollapsed(false);
        return;
      default:
        return;
    }
  },[breakP])
  
  const sortPrice = (increase) => {
    console.log(increase)
  }
  const onChangeMin = (value) => {
    console.log(value)
  }
  const toggleCapacity = (increase) => {
    console.log(increase)
  }
  return !collapsed ? (
  <Row gutter={[16,16]}>
    <Col span={4}>
      <Dropdown
        title={<div style={{width: 100}}> Sort Price</div>}
        style={{width: "100%"}}
        renderTitle={children => {
          return <Button>{children}</Button>;
        }}
      >
        <Dropdown.Item onClick={()=>sortPrice(true)}>
          <Icon icon="arrow-circle-up" /> Price: High to Low
        </Dropdown.Item>
        <Dropdown.Item onClick={()=>sortPrice(false)}>
          <Icon icon="arrow-circle-down" /> Price: Low to High
        </Dropdown.Item>
      </Dropdown>
    </Col>
    <Col span={4}>
      <Dropdown
        title={<div style={{width: 100}}> Price</div>}
        style={{width: "100%"}}
        renderTitle={children => {
          return <Button>{children}</Button>;
        }}
      >
        <div style={{width: 500, padding: "10px 50px 10px 50px", zIndex: 10}}>
          <RangeSlider 
            step={0.5}
            min={0}
            max={5}
            graduated
            progress
            renderMark={mark => {
              if ([0, 2.5, 5].includes(mark)) {
                return <span>{mark} milions</span>;
              }
              return null;
            }}
            onChange={(value)=>{
              setValue({min: value[0], max: value[1]})
            }}
          />
          <Form layout="inline" formValue={{min: value.min, max: value.max}}>
            <FormGroup>
              <ControlLabel style={{width: 75}}>Min Price</ControlLabel>
              <FormControl name="min" style={{maxWidth: 200}} readOnly/>
              <ControlLabel> milions VND</ControlLabel>
            </FormGroup>
            <FormGroup>
              <ControlLabel style={{width: 75}}>Max Price</ControlLabel>
              <FormControl name="max" style={{maxWidth: 200}} readOnly/>
              <ControlLabel> milions VND</ControlLabel>
            </FormGroup>
          </Form>
          <Button appearance="primary" style={{float: "right"}}>Apply</Button>
        </div>
      </Dropdown>
    </Col>
    <Col span={4}>
      <Dropdown
        title={<div style={{width: 100}}> Rating</div>}
        style={{width: "100%"}}
        className="star-select"
        renderTitle={children => {
          return <Button>{children}</Button>;
        }}
      >
        <Dropdown.Item onClick={()=>sortPrice(true)}>
          1 <Icon icon="star" /> 
        </Dropdown.Item>
        <Dropdown.Item onClick={()=>sortPrice(true)}>
          2 <Icon icon="star" /> 
        </Dropdown.Item>
        <Dropdown.Item onClick={()=>sortPrice(true)}>
          3 <Icon icon="star" /> 
        </Dropdown.Item>
        <Dropdown.Item onClick={()=>sortPrice(true)}>
          4 <Icon icon="star" /> 
        </Dropdown.Item>
        <Dropdown.Item onClick={()=>sortPrice(true)}>
          5 <Icon icon="star" /> 
        </Dropdown.Item>
      </Dropdown>
    </Col>
    <Col span={4}>
      <Dropdown
        title={<div style={{width: 100}}> More Filter</div>}
        style={{width: "100%"}}
        renderTitle={children => {
          return <Button>{children}</Button>;
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
    </Col>
    <Col span={4}>
      <Dropdown
        title={<div style={{width: 100}}> Capacity</div>}
        style={{width: "100%"}}
        renderTitle={children => {
          return <Button>{children}</Button>;
        }}
      >
        <div style={{width: 300, padding: "10px 10px 10px 10px"}} >
          <InputGroup>
            <InputGroup.Button onClick={()=>toggleCapacity(false)}>-</InputGroup.Button>
            <InputNumber
              className={'custom-input-number'}
              max={99}
              min={1}
              readOnly
              value={5}
            />
            <InputGroup.Button onClick={()=>toggleCapacity(true)}>+</InputGroup.Button>
          </InputGroup>
          <Button appearance="primary" style={{float: "right", marginTop: 10}}>Apply</Button>
        </div>
      </Dropdown>
    </Col>
    <Col span={24}>
      <SearchText />
    </Col>
  </Row>
  ) : (<>
    <Button onClick={()=>setVisible(true)}>More filters</Button>
    <Modal 
      title="More filters" 
      centered
      visible={visible}
      footer={
        <div>
					<Button className="btn-apple" appearance='primary' onClick={()=>{
						console.log('click');
					}}>Apply</Button>
				</div>
      }
      onOk={()=>{}}
      onCancel={()=>setVisible(false)}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  </>)
}