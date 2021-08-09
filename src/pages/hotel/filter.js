import React, { useState, useEffect } from 'react';
import { Row, Col, Grid, Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
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
  const { changeQuery, location } = props;
  
  const [ collapsed, setCollapsed ] = useState(false);
  const [ visible, setVisible ] = useState(false);
  const [ query, setQuery ] = useState(location);
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
    if(Object.values(location).length > 0) setQuery(location);
  },[location]);
  useEffect(()=>{
    // var t1 = clearProps(query, "page");
    // var t2 = clearProps(t1, "pageSize");
    // if(JSON.stringify(query) !== JSON.stringify(init))
    console.log(query) 
    return changeQuery(query);
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
      <MoreFilter appendQuery={appendQuery} clearQuery={clearQuery} query={query}/>
    </Col>
    {query.conveniences && <Col span={1} className="btn-close-center">
      <Button
        onClick={()=>setQuery(clearProps(query, "conveniences"))}
        shape="circle"
        icon={<CloseOutlined />}
      ></Button>
    </Col>}
    <Col span={24}>
      <SearchText appendQuery={appendQuery} clearQuery={clearQuery} query={query}/>
    </Col>
  </Row>
  ) : (<>
    <Row gutter={[16,16]}>
      <Col span={24}>
        <SearchText appendQuery={appendQuery} clearQuery={clearQuery} query={query}/>
      </Col>
      <Col span={24}>
        <Button onClick={()=>setVisible(true)}>More filters</Button>
      </Col>
    </Row>
    
    <Modal 
      title="More filters" 
      centered
      visible={visible}
      footer={
        <div>
          <Button className="btn-apple" appearance='primary' onClick={()=>{
						setQuery({});
            setVisible(false);
					}}>Clear</Button>
          <Button className="btn-apple btn-update" appearance='primary' onClick={()=>{
            setVisible(false);
					}}>Close</Button>
				</div>
      }
      onOk={()=>{}}
      onCancel={()=>setVisible(false)}
    >
      <Row gutter={[16,16]}>
        <Col span={20}>
          <SortPrice appendQuery={appendQuery} clearQuery={clearQuery} query={query}/>  
        </Col>
        {query.averagePrice && <Col span={4} className="btn-close-center">
          <Button
            onClick={()=>setQuery(clearProps(query, "averagePrice"))}
            shape="circle"
            icon={<CloseOutlined />}
          ></Button>
        </Col>}
        <Col span={20}>
          <Rating appendQuery={appendQuery} clearQuery={clearQuery} query={query}/>
        </Col>
        {query.rating && <Col span={4} className="btn-close-center">
          <Button
            onClick={()=>setQuery(clearProps(query, "rating"))}
            shape="circle"
            icon={<CloseOutlined />}
          ></Button>
        </Col>}
        <Col span={20}>
          <Capacity appendQuery={appendQuery} clearQuery={clearQuery} query={query}/>
        </Col>
        {query.capacity && <Col span={4} className="btn-close-center">
          <Button
            onClick={()=>setQuery(clearProps(query, "capacity"))}
            shape="circle"
            icon={<CloseOutlined />}
          ></Button>
        </Col>}
        <Col span={20}>
          <MoreFilter appendQuery={appendQuery} clearQuery={clearQuery} query={query}/>
        </Col>
        {query.conveniences && <Col span={4} className="btn-close-center">
          <Button
            onClick={()=>setQuery(clearProps(query, "conveniences"))}
            shape="circle"
            icon={<CloseOutlined />}
          ></Button>
        </Col>}
        {/* <Col span={24}>
          <SearchText appendQuery={appendQuery} clearQuery={clearQuery} query={query} key={1}/>
        </Col> */}
      </Row>
    </Modal>
  </>)
}

// const appendQuery = (obj) => {
//   setQuery({...query,...obj});
// }
// const clearQuery = (props) => {
//   setQuery(clearProps(query,props));
// }