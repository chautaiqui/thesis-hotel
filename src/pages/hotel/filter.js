import React, { useState, useEffect } from 'react';
import { Row, Col, Grid, Menu, Modal, Button } from 'antd';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { SearchText } from './filter/search';
import "./hotel.style.scss";
import { SortPrice } from './filter/sort-price';
import { Price } from './filter/price';
import { Rating } from './filter/rating';
import { Capacity } from './filter/capacity';
import { MoreFilter } from './filter/more-filter';
const { useBreakpoint } = Grid;
const breakPoint = (obj) => {
  const arr = Object.entries(obj).reverse();
  const temp = arr.filter((item) => item[1] === true);
  return temp[0] ? temp[0][0] : "xxl";
};
const clearProps = (obj, props) => {
  var temp = {};
  for (const [key, value] of Object.entries(obj)) {
    if(key !== props) {
      temp[key] = value;
    }
  }
  return temp;
}
export const Filter = (props) => {
  const { changeQuery } = props;
  const [ collapsed, setCollapsed ] = useState(false);
  const [ visible, setVisible ] = useState(false);
  const [ query, setQuery ] = useState({});
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

  const appendQuery = (obj) => {
    setQuery({...query,...obj});
  }
  const clearQuery = (props) => {
    setQuery(clearProps(query,props));
  }
  useEffect(()=>{
    console.log(query)
    changeQuery(query);
  },[query])
  return !collapsed ? (
  <Row gutter={[16,16]}>
    <Col span={4}>
      <SortPrice appendQuery={appendQuery} clearQuery={clearQuery} query={query}/>  
    </Col>
    {query.averagePrice && <Col span={1} className="btn-close-center">
      <Button
        onClick={()=>setQuery(clearProps(query, "averagePrice"))}
        shape="circle"
        icon={<CloseOutlined />}
      ></Button>
    </Col>}
    <Col span={4}>
      <Price appendQuery={appendQuery} clearQuery={clearQuery} query={query}/>
    </Col>
    {(query.minPrice || query.maxPrice) && <Col span={1} className="btn-close-center">
      <Button
        onClick={()=>{
          var _t = clearProps(query, "minPrice");
          var t = clearProps(_t, "maxPrice");
          setQuery(t)
        }}
        shape="circle"
        icon={<CloseOutlined />}
      ></Button>
    </Col>}
    <Col span={3}>
      <Rating appendQuery={appendQuery} clearQuery={clearQuery} query={query}/>
    </Col>
    {query.rating && <Col span={1} className="btn-close-center">
      <Button
        onClick={()=>setQuery(clearProps(query, "rating"))}
        shape="circle"
        icon={<CloseOutlined />}
      ></Button>
    </Col>}
    <Col span={4}>
      <Capacity appendQuery={appendQuery} clearQuery={clearQuery} query={query}/>
    </Col>
    {query.capacity && <Col span={1} className="btn-close-center">
      <Button
        onClick={()=>setQuery(clearProps(query, "capacity"))}
        shape="circle"
        icon={<CloseOutlined />}
      ></Button>
    </Col>}
    <Col span={4}>
      <MoreFilter />
    </Col>
    <Col span={24}>
      <SearchText appendQuery={appendQuery} clearQuery={clearQuery} query={query}/>
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
      Filter
    </Modal>
  </>)
}

