import { React, useState, useEffect} from 'react';
import { getRequest } from '../../pkg/api';

import { useLocation } from 'react-router-dom';
import { message, PageHeader, Row, Col } from 'antd';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const routes = [
  {
    // path: 'index',
    breadcrumbName: 'Home',
  },
  {
    // path: 'first',
    breadcrumbName: 'Blog',
  },
];

export const Blog = () => {
  const query = useQuery();
  const [ post, setPost ] = useState({data: {}, route: ""});
  console.log(query.get('id'), post);

  useEffect(()=>{
    const fetchPost = async () => {
      const re = await getRequest('blog', {}, [query.get('id')]);
      console.log(re);
      if(!re.success) {
        message.error(re.message)
      }
      else {
        if(re.result.length === 0) return;
        setPost(re.result)
      }
    }
    if(!post._id) {
      fetchPost();
    }
  },[query])

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={!post.title ? "Title" : post.title}
        breadcrumb={{ routes }}
        subTitle={post.createdAt}
      />
      <Row>
        <Col span={20} offset={2}>
          <p>{post.content}</p>
          <img src={post.img} alt="img-post" style={{maxWidth: "100%"}}/>
        </Col>
      </Row>
    </>
  )
}
