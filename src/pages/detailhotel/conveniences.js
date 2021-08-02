import React from 'react';
import { Row, Col } from 'antd';

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

export const Conveniences = (props) => {
  const { data } = props;
  const fdata = data.map(item => {
    var t = moreCon.find(i=> i.value === item);
    return t
  })
  console.log(fdata)
  return <>
  <h4>Conveniences</h4>
  <Row gutter={[16,16]}>
    {
      fdata.map((item, index) => {
        return <Col xs={24} sm={12} key={index} style={{display: "flex",
          alignItems: "center"}}>
          <img src={item.img} alt="" style={{maxWidth: 40}}/>
          <span style={{marginLeft: 25}}>{item.value}</span>
        </Col>
      })
    }
  </Row>
  </>
}