import React, { useState, useEffect } from "react";
import { List } from "antd";

import "./styles.scss";
import { getRequest } from "../../pkg/api";

const RecommendBlog = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      const res = await getRequest("blog");
      setBlogs(res.result.blogs);
    };
    getBlogs();
  }, []);
  return (
    <List
      itemLayout="horizontal"
      dataSource={blogs}
      className="list-blogs"
      renderItem={(item) => (
        <List.Item>
          {" "}
          <List.Item.Meta
            avatar={<img alt="avatar" className="img-blog" src={item.img} />}
            title={<a href={`/blog/${item._id}`}>{item.title}</a>}
            description={item.content}
          />
        </List.Item>
      )}
    />
  );
};

export default RecommendBlog;
