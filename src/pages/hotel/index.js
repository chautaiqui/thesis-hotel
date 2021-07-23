import { message, Select } from "antd";
import React, { useState, useEffect, useReducer } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getRequest } from "../../pkg/api";
import { Row, Col, Pagination, Button, Form, Input, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { HotelItem } from "../../components/hotel-item";
import "./hotel.style.scss";
import { messageError } from "../../commons";
import { CustomEmpty } from "../../commons/components/empty";
import { Filter } from "./filter";

// const url =
// "https://res.cloudinary.com/hotellv/image/upload/v1621233855/tmsvnhfbf7vcmks132jy.jpg";
const { Option } = Select;

const HotelReducer = (state, action) => {
  switch (action.type) {
		case 'GET_DATA_SUCCESS':
			return { ...state, data: action.data, query: action.query, total: action.total, behavior: 'stall' }
		case 'GET_DATA_ERROR':
			return { ...state, data: [], behavior: 'stall' };
		case 'PAGINATION': 
			return { ...state, query: action.query, total: action.total, behavior: 'init'}
		case 'RELOAD':
			return { ...state, behavior: 'init' };
    case 'QUERY':
      return { ...state, behavior: 'init', query: action.query};
		default:
		return state;
  } 
}
const initState = {
	behavior: 'init',
	data: [],
	query: { page: 1, pageSize: 10},
	total: undefined
}

export const Hotel = () => {
  var location = useLocation();
  const history = useHistory();
  const [ state, dispatch ] = useReducer(HotelReducer, initState);

  useEffect(()=>{
    var param = location.search
      .slice(1)
      .split("&")
      .reduce(
        (r, i) => Object.assign({}, r, { [i.split("=")[0]]: i.split("=")[1] }),
        {}
      );
      dispatch({
        type: "PAGINATION", query: { ...param, ...state.query}, total: undefined
      })
  },[])
  useEffect(() => {
    const params = [];
    for (const [key, value] of Object.entries(state.query)) {
      if (state.query[key]) params.push(`${key}=${value}`);
    }
    history.push({
      path: "hotel",
      search: `?${params.join("&")}`,
    });
    console.log(params.join("&"))
    const getHotel = async () => {
      const res = await getRequest("hotel", state.query);
      if (res.success) {
        // setLstHotel({ behavior: "stall", data: res.result.hotels, total: res.totalPages});
        dispatch({
          type: 'GET_DATA_SUCCESS', data: res.result.hotels, total: res.result.totalItems, 
          query: {...state.query, page: res.result.currentPage, pageSize: res.result.pageSize}
        })
      } else {
        messageError("Error", res.error);
      }
    };
    if(state.behavior === 'init') getHotel();
    // eslint-disable-next-line
  }, [state]);

  const hotelClick = (item) => {
    history.push(`/hotel/${item._id}`);
  };
  const changeQuery = (query) => {
    dispatch({
      type: 'QUERY', query: query
    })
  }
  return (
    <>
      <Filter changeQuery={changeQuery}/>
      <Row gutter={[16, 16]} style={{ marginTop: 50 }}>
        {state.data.length !== 0 ? (
          state.data.map((item, index) => {
            return (
              <Col xs={24} sm={24} md={12} lg={12} key={index}>
                <HotelItem 
                  hotel={item}
                  redirect={() => {
                    hotelClick(item);
                  }}
                />
              </Col>
            );
          })
        ) : (
          <Col span={24} style={{ marginBottom: 150 }}>
            <CustomEmpty title="Loading"/>
          </Col>
        )}
        {
          state.behavior === 'stall' && state.data.length === 0 && <Col span={24} style={{ marginBottom: 150 }}>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={
                <span>
                  <a href="/hotel">Hotel?</a>
                </span>
              }
            >
              <h1>No hotels found</h1>
            </Empty>
          </Col>
        }
      </Row>
      <Pagination
        disabled={state.data.length === 0 && state.behavior === 'stall'}
        current={state.query.page || 1}
        pageSize={state.query.pageSize || 1}
        pageSizeOptions={[5,10,20]}
        total={state.total || 10}
        showSizeChanger={true}
        showTotal={total => `Total ${total} hotels`}
        onChange={function(page, pageSize) {
          dispatch({type: 'PAGINATION', query: { ...state.query, page: page, pageSize: pageSize}, total: state.total })
        }}
        onShowSizeChange={function(current, size) {
          dispatch({type: 'PAGINATION', query: { ...state.query, page: current, pageSize: size}, total: state.total })
        }}
        style={{display: 'flex',justifyContent: 'center',marginTop: 50}}
      />
    </>
  );
};
