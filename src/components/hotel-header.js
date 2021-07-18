import React, { useEffect, useState } from "react";
import { Row, Col, Drawer, message, Form, Input, Rate, Button, Empty } from "antd";
import "./css/hotel-header.style.css";
import { getRequest, postMethod } from "../pkg/api";
import { messageError, messageSuccess } from "../commons";
import Modal from "antd/lib/modal/Modal";
import { RatingItem } from "./rating-item";

const default_img =
  "https://ads-cdn.fptplay.net/static/banner/2021/06/c21f969b5f03d33d43e04f8f136e7682_1279.png";

const initState = {
  behavior: 'init',
  rating: [],
  open: false
}  
export const HotelHeader = ({ hotel, user, update = () => {} }) => {
  const { imgs, rated, name } = hotel;
  const [ viewimg, setViewimg ] = useState(false);
  const [ state, setState ] = useState(initState);
  const [ form_rate ] = Form.useForm();
  const viewDetail = () => {
    setViewimg(true);
  };

  const getData = async () => {
      if(!hotel._id) return;
      const res = await getRequest(`hotel/${hotel._id}/rating`);
      if(res.success) {
        console.log(res.result)
        setState({
          ...state,
          behavior: 'stall',
          rating: res.result.ratings
        })
      } else {
        messageError(res.error);
        return;
      }
  }
  useEffect(()=>{
    if(state.behavior === 'init') {
      getData();
    } else {
      return;
    }
  },[hotel, state.behavior])


  const postComment = async(path,data) => {
    const res = await postMethod(path, data);
    if(res.success) {
      messageSuccess("Successfully!");
      setState({
        ...state,
        behavior: "init"
      })
      update();
    } else {
      messageError("Error", res.error);
    }
  }
  const submitRating = (values) => {
    if(!user.login) {
      messageError("Not logged in","You need to login for rating hotel!");
    }
    const data = {
      ...values, customer: user._id
    }
    console.log(data, hotel);
    if(!hotel._id) {
      messageError("Error", "Something error!")
    }
    postComment(`hotel/${hotel._id}/rating`, data);
  }
  return (
    <>
      <h1 style={{ fontWeight: "bolder" }}>{name}</h1>
      <p onClick={()=>setState({...state, open: true})}>
        <img
          src="https://ads-cdn.fptplay.net/static/banner/2021/06/e54399990405e70797a942a2fff4c159_484.png"
          alt="hinh"
          className="hotel-header-star"
        />
        <ins>{rated ? rated.avgValue + " rated" : "5 rated"}</ins>
        <a href="#">Có {rated ? rated.amount : ""} bài đánh giá</a>
      </p>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} onClick={viewDetail}>
          <img
            src={imgs ? imgs[0] : default_img}
            className="hotel-header-img-ele-left"
            alt="ele"
          />
        </Col>
        <Col xs={24} sm={12}>
          {imgs && (
            <Row gutter={[16, 16]}>
              {[1, 2, 3, 4].map((item) => {
                return (
                  <Col span={12} key={item} onClick={viewDetail}>
                    {imgs[item] && (
                      <img
                        src={imgs[item]}
                        className="hotel-header-img-ele-left"
                        alt="ele"
                      />
                    )}
                  </Col>
                );
              })}
            </Row>
          )}
        </Col>
      </Row>
      <div className="hotel-header-detail">
        <p style={{ cursor: "pointer" }} onClick={viewDetail}>
          <img
            src="https://ads-cdn.fptplay.net/static/banner/2021/06/951da6b7179a4f697cc89d36acf74e52_2064.png"
            alt="viewmore"
            className="hotel-header-star"
          />
          <b>view detail</b>
        </p>
      </div>
      <Drawer
        placement={"bottom"}
        closable={false}
        onClose={() => {
          setViewimg(false);
        }}
        visible={viewimg}
        height={"100%"}
        key={"bottom-img"}
      >
        <div
          onClick={() => {
            setViewimg(false);
          }}
        >
          <img
            src="https://ads-cdn.fptplay.net/static/banner/2021/06/d13c063446db6193273024ece6946b22_3978.png"
            alt="back"
            className="hotel-header-back"
          />
        </div>
        <Row>
          <Col span={16} offset={4}>
            <Row gutter={[16, 16]} >
            
              {imgs &&
                imgs.map((item, index) => {
                  return (
                    <Col span={index % 3 === 0 ? 24 : 12} key={index}>
                      <img
                        src={item}
                        className="hotel-header-img-ele-left"
                        alt="ele"
                      />
                    </Col>
                  );
                })}
            </Row>
          </Col>
        </Row>
        
      </Drawer>
      
      <Drawer
        placement={"bottom"}
        closable={false}
        onClose={() => {
          setState({...state, open: false});
        }}
        visible={state.open}
        height={"100%"}
        key={"rating"}
        className="box-rating"
        style={{
          width: '80%',
          top: '20%',
          left: '10%',
          height: 500
        }}
      >
        <div
          onClick={() => {
            setState({...state, open: false});
          }}
        >
          <img
            src="https://ads-cdn.fptplay.net/static/banner/2021/07/19_60f460a85140f7000132319b.png"
            alt="back"
            className="hotel-header-close"
          />
        </div>

        <Row gutter={[16,16]} style={{marginTop: 20}}>
          <Col xs={24} sm={24} md={8}>
            <Form form={form_rate} onFinish={submitRating}>
              <Form.Item 
                name="comment"
                rules={[
                  {
                    required: true,
                    message: 'Please input your comment!',
                  },
                ]}
              >
                <Input.TextArea/>
              </Form.Item>
              <Form.Item 
                name="rating"
                rules={[
                  {
                    required: true,
                    message: 'Please rate your star!',
                  },
                ]}
              >
                <Rate style={{color: '#a0d911'}}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-rating">
                  Rate
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col xs={24} sm={24} md={{span: 14, offset: 2}}>
            {
              state.rating.length !== 0 ?
                state.rating.map((item, index) => (
                  <RatingItem key={index} rate={item}/>
                )) : <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{
                    height: 60,
                  }}
                  description={
                    <span>
                      No comment
                    </span>
                  } 
                ></Empty>
            }
          </Col>
        </Row>
      </Drawer>
    </>
  );
};
