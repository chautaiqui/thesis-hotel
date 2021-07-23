import React, { useState, useEffect } from 'react';
import { Dropdown, Button, Icon } from 'rsuite';
import '../hotel.style.scss';

export const SortPrice = (props) => {
  const { appendQuery = () => {}, query, clearQuery = () => {} } = props;
  const [ cur, setCur ] = useState("btn-filter");
  const tooglePrice = (type) => {
    switch (type) {
      case 1:
        appendQuery({
          averagePrice: "asc"
        })
        return;
      case 2:
        appendQuery({
          averagePrice: "desc"
        })
        return;
      // case 3:
      //   clearQuery(query, "averagePrice");
      //   return;
      default:
        return;
    }
  }
  useEffect(()=>{
    if(query.averagePrice) setCur("btn-filter have-query");
    else {
      setCur("btn-filter");
    }
  },[props])
  return <Dropdown
    title={<div style={{width: "100%"}}> Sort Price</div>}
    style={{width: "100%"}}
    className="star-select filter-dropdown"
    renderTitle={children => {
      return <Button className={cur}>{children}</Button>;
    }}
  >
    <Dropdown.Item onClick={()=>tooglePrice(2)}>
      <Icon icon="arrow-circle-up" /> High to Low
    </Dropdown.Item>
    <Dropdown.Item onClick={()=>tooglePrice(1)}>
      <Icon icon="arrow-circle-down" /> Low to High
    </Dropdown.Item>
  </Dropdown>
}