import React, { useState, useEffect } from 'react';
import { Dropdown, Button, RangeSlider, Form, FormGroup,
  ControlLabel, FormControl } from 'rsuite';

export const Price = (props) => {
  const { appendQuery=()=>{}, clearQuery=()=>{}, query={} } = props;
  const [ cur, setCur ] = useState("btn-filter");
  const myRef = React.createRef();
  const [ value, setValue ] = useState({min: 0, max: 0});
  const onApply = () => {
    // console.log(value, myRef.current.state, myRef.current.toggle);
    myRef.current.state.open = false;
    if(value.min === 0 && value.max === 0) {
      return;
    }
    if(value.min === 5 && value.max === 5) {
      appendQuery({
        minPrice: 5*1000000,
        maxPrice: undefined
      })
      return;
    } else {
      appendQuery({
        minPrice: value.min*1000000,
        maxPrice: value.max*1000000,
      })
    } 
    
  }
  useEffect(()=>{
    if(query.minPrice || query.maxPrice) setCur("btn-filter have-query");
    else {
      setCur("btn-filter");
    }
    setValue({
      min: query.minPrice ? query.minPrice/1000000 : 0,
      max: query.maxPrice ? query.maxPrice/1000000 : 0,
    })
  },[props])
  return <Dropdown
    ref={myRef}
    title={<div style={{width: "100%"}}> Price</div>}
    style={{width: "100%"}}
    className="filter-dropdown"
    renderTitle={children => {
      return <Button className={cur}>{children}</Button>;
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
            if(mark === 5) return <span>{mark}+ milions</span>;
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
      <Button appearance="primary" style={{float: "right"}} onClick={onApply}>Apply</Button>
    </div>
  </Dropdown>
}