import React, { useEffect, useState } from 'react';
import { Dropdown, Button } from 'rsuite';
import { Checkbox, Row, Col } from 'antd';

export const MoreFilter = (props) => {
  const { appendQuery = () => {}, clearQuery = () => {}, query = {}} = props;
  const [ value, setValue ] = useState([]);
  const [ cur, setCur ] = useState("btn-filter");

  useEffect(()=>{
    if(query.conveniences) {
      setCur("btn-filter have-query");
      setValue(query.conveniences.split(","));
    }
    else {
      setCur("btn-filter");
    }
  },[props]);

  const onChange = (values) => {
    setValue(values);
  }
  const onApply = () => {
    appendQuery({
      conveniences: value.join(',')
    })
  }
  return <Dropdown
    title={<div style={{width: "100%"}}> More Filter</div>}
    style={{width: "100%"}}
    className="filter-dropdown"
    renderTitle={children => {
      return <Button className={cur}>{children}</Button>;
    }}
  >
    <div style={{width: 300, padding: "10px 10px 10px 10px"}} >
      <Checkbox.Group onChange={onChange}>
        <Row>
          {
            moreCon.map((item, index)=> {
              return <Col xs={24} sm={12} key={index}>
                <Checkbox value={item.value}>{item.label}</Checkbox>
              </Col>
            })
          }
        </Row>
      </Checkbox.Group>
      <Button appearance="primary" style={{float: "right"}} onClick={onApply}>Apply</Button>
    </div>
  </Dropdown>
}

const moreCon = [
  {
    value: "hồ bơi", label: "hồ bơi",
    img: "https://ads-cdn.fptplay.net/static/banner/2021/08/03_61082b245140f70001289397.png"
  },
  {
    value: "sân bóng đá", label: "sân bóng đá",
    img: "https://ads-cdn.fptplay.net/static/banner/2021/08/03_61082b11b04a6700011f54ae.png"
  },
  {
    value: "bar", label: "bar",
    img: "https://ads-cdn.fptplay.net/static/banner/2021/08/03_61082b725140f7000116e6e9.png"
  },
  {
    value: "tennis", label: "tennis",
    img: "https://ads-cdn.fptplay.net/static/banner/2021/08/03_61082ae5b04a6700013a02ae.png"
  },
  {
    value: "buffet", label: "buffet",
    img: "https://ads-cdn.fptplay.net/static/banner/2021/08/03_61082b4db04a67000119b2ae.png"
  },
  {
    value: "bồn tắm", label: "bồn tắm",
    img: "https://ads-cdn.fptplay.net/static/banner/2021/08/03_61082b5fb04a6700011ee32d.png"
  },
  {
    value: "ban công", label: "ban công",
    img: "https://ads-cdn.fptplay.net/static/banner/2021/08/03_61082b85b04a6700012605ca.png"
  },
  {
    value: "tv", label: "tv",
    img: "https://ads-cdn.fptplay.net/static/banner/2021/08/03_61082af9b04a6700011d279e.png"
  },
  {
    value: "máy giặt", label: "máy giặt",
    img: "https://ads-cdn.fptplay.net/static/banner/2021/08/03_61082acd5140f700013ae220.png"

  },
  {
    value: "bãi giữ xe", label: "bãi giữ xe",
    img: "https://ads-cdn.fptplay.net/static/banner/2021/08/03_61082b38b04a67000133a770.png"
  },
  {
    value: "khu vực bếp", label: "khu vực bếp",
    img: "https://ads-cdn.fptplay.net/static/banner/2021/08/03_61082b955140f7000116c898.png"
  }
]