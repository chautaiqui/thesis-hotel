import React, { useState, useEffect } from "react";
import { getRequest } from "../../pkg/api";
import { getQuery, pushQuery } from "../../pkg/query";
import { useHistory } from "react-router-dom";
import { Row, Col, Pagination } from "antd";

const initState = {
  behavior: "init",
  data: [],
  query: {page: 1, pageSize: 10},
  total: undefined
};

export const Blog = (props) => {
  const [state, setState] = useState(initState);
  const history = useHistory();
  const getData = async () => {
    const res = await getRequest("blog", state.query);
    if (res.success) {
      setState({
        behavior: "stall",
        data: res.result.blogs,
        query: { page: res.result.currentPage, pageSize: res.result.pageSize},
        total: res.result.totalItems
      });
      const _q = pushQuery(state.query);
			history.push({
				path: '/manager',
				search: "?" + _q
			})
    }
  };
  const blogClick = (item) => {
    history.push(`/blog/${item._id}`);
  };
  useEffect(() => {
    switch (state.behavior) {
      case "init":
        getData();
        return;
      case "stall":
        return;
      default:
        break;
    }
  }, [state]);
  useEffect(()=> {
    const param = getQuery(window.location.search);
    console.log(param)
		if(param.pageSize && param.page) {
      setState({
        ...state, 
        query: { page: Number(param.page), pageSize: Number(param.pageSize)},
        behavior: 'init'
      })
		} else {
			const _q = pushQuery(state.query);
			history.push({
				path: '/blog',
				search: "?" + _q
			})
		}
  },[props])
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: 50 }}>
        {state.data.map((item, index) => <BlogItem blog={item} blogClick={blogClick} key={index}/>)}
      </Row>
      <Pagination
        disabled={state.data.length === 0}
        current={state.query.page}
        pageSize={state.query.pageSize}
        pageSizeOptions={[5,10,20]}
        total={state.total}
        showSizeChanger={true}
        showTotal={total => `Total ${total} blogs`}
        onChange={function(page, pageSize) {
          // dispatch({type: 'PAGINATION', query: { page: page, pageSize: pageSize}, total: state.total})
          // setQuery({...query, ...{ page: page, pageSize: pageSize}});
          // setBehavior('init');
          setState({
            ...state, 
            query: {...state.query, page: page, pageSize: pageSize },
            behavior: 'init'
          })
        }}
        onShowSizeChange={function(current, size) {
          // dispatch({type: 'PAGINATION', query: { page: current, pageSize: size}, total: state.total});
          // setQuery({...query, ...{ page: current, pageSize: size} });
          // setBehavior('init');
          setState({
            ...state, 
            query: {...state.query, page: current, pageSize: size },
            behavior: 'init'
          })
        }}
        style={{display: 'flex',justifyContent: 'center',marginTop: 10, paddingBottom: 30}}
      />
    </>
  );
};


const BlogItem = (props) => {
  const { blog, blogClick = () => {} } = props;
  return (
    <Col
      xs={24} sm={12} md={8} lg={6} xl={6}
      onClick={() => {
        blogClick(blog);
      }}
    >
      <img src={blog.img} alt="blog" style={{ maxWidth: "100%" }} />
      <p style={{ textAlign: "center", fontWeight: 500 }}>
        {blog.title}
      </p>
    </Col>
  )
}