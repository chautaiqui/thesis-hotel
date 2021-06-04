import React, { useState } from 'react';
import { Row, Col, Drawer } from 'antd';
import './css/hotel-header.style.css';

const default_img = 'https://ads-cdn.fptplay.net/static/banner/2021/06/c21f969b5f03d33d43e04f8f136e7682_1279.png';
export const HotelHeader = ({hotel}) => {
  console.log(hotel);
  const { imgs, rated, name } = hotel;
  const [ viewimg, setViewimg ] = useState(false);
  const rate = () => {
    console.log('click')
  }
  const viewDetail = () => {
    setViewimg(true)
  }
  return <>
    <h1 style={{ fontWeight: "bolder" }}>{name}</h1>
    <p onClick={rate}>
      <img src='https://ads-cdn.fptplay.net/static/banner/2021/06/e54399990405e70797a942a2fff4c159_484.png' className='hotel-header-star'/>
      <ins>{rated ? rated.avgValue + ' rated': '5 rated'}</ins>
    </p>
    <Row gutter={[16,16]}> 
      <Col xs={24} sm={12} onClick={viewDetail}>
        <img src={ imgs ? imgs[0] : default_img} className="hotel-header-img-ele-left" alt="ele"/>
      </Col>
      <Col xs={24} sm={12}>
        {imgs && <Row gutter={[16,16]}>
          {
            [1,2,3,4].map(item=> {
              return (<Col span={12} key={item} onClick={viewDetail}>
                {imgs[item] && <img src={imgs[item]} className="hotel-header-img-ele-left" alt="ele"/>}
              </Col>)
            })
          }
        </Row>}
      </Col>
    </Row>
    <div className="hotel-header-detail">
      <p style={{cursor: 'pointer'}} onClick={viewDetail}>
        <img src='https://ads-cdn.fptplay.net/static/banner/2021/06/951da6b7179a4f697cc89d36acf74e52_2064.png' alt='viewmore' className='hotel-header-star'/>
        <b>view detail</b>
      </p>
    </div>
    <Drawer
      placement={'bottom'}
      closable={false}
      onClose={()=>{setViewimg(false)}}
      visible={viewimg}
      height={"100%"}
      key={'bottom-img'}
    >
      <div onClick={()=>{setViewimg(false)}}>
        <img src="https://ads-cdn.fptplay.net/static/banner/2021/06/d13c063446db6193273024ece6946b22_3978.png" alt='back' className='hotel-header-back'/>
      </div>
      <Row gutter={[16,16]} className="draw-detail-img">
        {
          imgs && imgs.map((item, index)=>{
            return <Col span={ index%3===0 ? 24 : 12} key={index}>
              <img src={item} className="hotel-header-img-ele-left" alt="ele"/>
            </Col>
          })
        }
      </Row>
    </Drawer>
  </>
}