import { Select } from "antd";
import React, { useEffect, useReducer } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getRequest } from "../../pkg/api";
import { Row, Col, Pagination, Empty } from "antd";
import { HotelItem } from "../../components/hotel-item";
import "./hotel.style.scss";
import { messageError } from "../../commons";
import { CustomEmpty } from "../../commons/components/empty";
import { Filter } from "./filter";

// const url =
// "https://res.cloudinary.com/hotellv/image/upload/v1621233855/tmsvnhfbf7vcmks132jy.jpg";
const { Option } = Select;

const HotelReducer = (state, action) => {
  // console.log(action)
  switch (action.type) {
		case 'GET_DATA_SUCCESS':
			return { ...state, data: action.data, query: action.query, total: action.total, behavior: 'stall', location: {} }
		case 'GET_DATA_ERROR':
			return { ...state, data: [], behavior: 'stall', location: {} };
		case 'PAGINATION': 
			return { ...state, query: action.query, total: action.total, behavior: 'init', location: {}}
		case 'RELOAD':
			return { ...state, behavior: 'init' };
    case 'QUERY':
      return { ...state, behavior: 'init', query: action.query, location: {}};
    case 'LOCATION':
      return { ...state, behavior: 'stall', location: action.location};
		default:
		return state;
  } 
}
const initState = {
	behavior: 'init',
	data: [],
	query: {page: 1, pageSize: 10},
	total: undefined,
  location: {}
}

export const Hotel = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [ state, dispatch ] = useReducer(HotelReducer, initState);

  useEffect(()=>{
    var param = location.search
      .slice(1)
      .split("&")
      .reduce(
        (r, i) => Object.assign({}, r, { [i.split("=")[0]]: decodeURIComponent(i.split("=")[1]) }),
        {}
      );
      console.log('param in hotel:', param)
      if(param.searchText) {
        dispatch({
          type: "LOCATION", location: param
        })
      }
  },[props]);
  
  const getHotel = async () => {
    const res = await getRequest("hotel", state.query);
    if (res.success) {
      // setLstHotel({ behavior: "stall", data: res.result.hotels, total: res.totalPages});
      dispatch({
        type: 'GET_DATA_SUCCESS', data: res.result.hotels, total: res.result.totalItems, 
        query: {...state.query, page: res.result.currentPage, pageSize: res.result.pageSize},
      })
      const params = [];
      for (const [key, value] of Object.entries(state.query)) {
        if (state.query[key]) params.push(`${key}=${value}`);
      }
      var t = "?" + params.join("&");

      console.log(window.history, t)
      // window.history.replaceState(null,"", t);
      history.replace({
        path: "hotel",
        search: t,
      });
    } else {
      messageError("Error", res.error);
      return;
    }
    
  }
  useEffect(() => {
    if(state.behavior === 'stall') return () => {};
    if(state.behavior === 'init') {
      return getHotel();
    }
    // eslint-disable-next-line
  }, [state.query]);

  const hotelClick = (item) => {
    history.push(`/hotel/${item._id}`);
  };
  const changeQuery = (query) => {
    dispatch({
      type: 'QUERY', query: query
    })
  }
  console.log(state.query)
  return (
    <>
      <Filter changeQuery={changeQuery} location={state.location}/>
      <Row gutter={[16, 16]} style={{ marginTop: 50 }}>
        {(state.behavior !== 'init') ? (
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
