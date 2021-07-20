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
			return { ...state, behavior: 'init', popup: action.popup };
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
  const [form] = Form.useForm();

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
    // console.log(query);
    // form.setFieldsValue(query);
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
  const onFinish = (value) => {
    // setQuery(value);
  };

  const onFix = (v) => {
    // setQuery({ ...query, conveniences: v.join(",") });
  };

  const onRate = (v) => {
    // setQuery({ ...query, bookingRating: v });
  };
  console.log(state)
  return (
    <>
      {/* <div className="hotel-filter">
        <Form name="search-filter" form={form} onFinish={onFinish}>
          <Row gutter={24}>
            <Col xs={24} sm={7} md={7} lg={6} xl={7}>
              <Form.Item label="Search" name="searchText">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={7} md={7} lg={7} xl={7}>
              <Form.Item label="Capacity" name="capacity">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={7} md={7} lg={7} xl={7}>
              <Form.Item label="Sort by price" name="averagePrice">
                <Select
                  placeholder="Sort by Price"
                  options={[
                    { label: "Price: Low to High", value: "asc" },
                    { label: "Price: High to Low", value: "desc" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={3} md={3} lg={3} xl={3}>
              <Form.Item>
                <Button
                  icon={<SearchOutlined />}
                  type="primary"
                  htmlType="submit"
                  shape="round"
                >
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
          Filter by:
          <Row gutter={24}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Select
                mode="tags"
                onChange={onFix}
                style={{ width: "100%" }}
                placeholder="Conveniences"
              >
                <Option value="hồ bơi">Hồ Bơi</Option>
                <Option value="sân bóng đá">Sân bóng đá</Option>
                <Option value="bar">Bar</Option>
                <Option value="tennis">Tennis</Option>
                <Option value="buffet">Buffet</Option>
                <Option value="bồn tắm">Bồn tắm</Option>
                <Option value="ban công">Ban công</Option>
                <Option value="tv">TV</Option>
                <Option value="máy giặt">Máy giặt</Option>
                <Option value="bãi giữ xe">Bãi giữ xe</Option>
                <Option value="khu vực bếp">Khu vực bếp</Option>
              </Select>
            </Col>
            <Col xs={24} sm={5} md={5} lg={5} xl={5}>
              <Form.Item name="bookingRating">
                <Select
                  onChange={onRate}
                  style={{ width: "100%" }}
                  placeholder="Star Rating"
                >
                  <Option value="">All</Option>
                  <Option value="0">0 star</Option>
                  <Option value="1">
                    <i class="fas fa-star"></i>
                  </Option>
                  <Option value="2">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </Option>
                  <Option value="3">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </Option>
                  <Option value="4">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </Option>
                  <Option value="5">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div> */}
      <Filter />
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
