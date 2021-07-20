import React from 'react';
import { Row, Col } from 'antd';
import "./styles.scss";
export const BlogItem = (props) => {
  const { blog, search = () => {} } = props;
  return <>
    <Row gutter={[16,16]}>
      {blog.map((item, index) => {
        return ( <Col span={8}>
          <div className="blog-img" key={index}>
            <img
              className="main-img"
              src={item.img}
              alt="hinh"
              onClick={() => search(`/blog/${item._id}`)}
            />
            <p className="blog-title">{item.title}</p>
            <p className="blog-content">{item.content}</p>
          </div>
        </Col>);
      })}
    </Row>
  </>
}