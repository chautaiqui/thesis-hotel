import React, { useState, useEffect } from "react";
import { List, Avatar } from "antd";

import "./styles.scss";
import { getRequest } from "../../pkg/api";
import { useHistory } from "react-router-dom";

const RecommendBlog = () => {
  let history = useHistory();

  const routeChange = (id) => {
    let path = `/blog/${id}`;
    history.push(path);
  };
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      const res = await getRequest("blog");
      setBlogs(res.result);
    };
    getBlogs();
  }, []);
  console.log({ blogs });
  return (
    <List
      itemLayout="horizontal"
      dataSource={blogs}
      className="list-blogs"
      renderItem={(item) => (
        <List.Item>
          {" "}
          <List.Item.Meta
            avatar={<img className="img-blog" src={item.img} />}
            title={<a href={`/blog/${item._id}`}>{item.title}</a>}
            description={item.content}
          />
        </List.Item>
      )}
    />
  );
};

export default RecommendBlog;
