import React, { useState, useEffect } from "react";
import { getRequest } from "../../pkg/api";
import { useParams } from "react-router-dom";
import { message, PageHeader, Row, Col } from "antd";
import "./styles.scss";
import moment from "moment";

const routes = [
  {
    // path: 'index',
    breadcrumbName: "Home",
  },
  {
    // path: 'first',
    breadcrumbName: "Blog",
  },
];

export const BlogItem = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ data: {}, route: "" });

  useEffect(() => {
    const fetchPost = async () => {
      const re = await getRequest("blog", {}, [id]);
      if (!re.success) {
        message.error(re.message);
      } else {
        if (re.result.length === 0) return;
        setPost(re.result);
      }
    };
    if (!post._id) {
      fetchPost();
    }
  }, [id]);

  return (
    <>
      <div className="blog-detail">
        <PageHeader
          className="site-page-header"
          title={!post.title ? "Title" : post.title}
          breadcrumb={{ routes }}
          subTitle={moment(post.createdAt).format(
            "dddd, MMMM Do YYYY, h:mm:ss a"
          )}
        />
        <Row>
          <Col span={20} offset={2}>
            <img className="img-post" src={post.img} alt="img-post" />
            <p className="content-blog">{post.content}</p>
          </Col>
        </Row>
      </div>
    </>
  );
};
