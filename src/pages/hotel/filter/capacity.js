import React, { useState, useEffect } from 'react';
import { Dropdown, Button, InputNumber, InputGroup} from 'rsuite';

export const Capacity = (props) => {
  const { appendQuery=()=>{}, clearQuery=()=>{}, query={} } = props;
  const [ cur, setCur ] = useState("btn-filter");
  const myRef = React.createRef();
  const [ value, setValue ] = useState(0);
  const toggleNumber = (ins) => {
    if(ins) setValue(value + 1);
    if(!ins && value > 1) setValue(value - 1);
  }
  const onApply = () => {
    myRef.current.state.open = false;
    appendQuery({
      capacity: value
    })
  }
  useEffect(()=>{
    if(query.capacity) setCur("btn-filter have-query");
    else {
      setCur("btn-filter");
      setValue(0)
    }
  },[props])
  return <Dropdown
    ref={myRef}
    title={<div style={{width: "100%"}}> Capacity</div>}
    style={{width: "100%"}}
    className="filter-dropdown"
    renderTitle={children => {
      return <Button className={cur}>{children}</Button>;
    }}
  >
    <div style={{width: "100%", padding: "10px 10px 10px 10px"}} >
      <InputGroup>
        <InputGroup.Button onClick={()=>toggleNumber(false)} style={{margin: 0}}>-</InputGroup.Button>
        <InputNumber
          className={'custom-input-number'}
          max={99}
          min={1}
          readOnly
          value={value}
        />
        <InputGroup.Button onClick={()=>toggleNumber(true)} style={{margin: 0}}>+</InputGroup.Button>
      </InputGroup>
      <Button appearance="primary" style={{float: "right", marginTop: 10}} onClick={onApply}>Apply</Button>
    </div>
  </Dropdown>
}