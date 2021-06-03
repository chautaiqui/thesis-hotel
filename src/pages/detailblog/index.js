import React, {useState, useEffect} from 'react';
import { getRequest } from '../../pkg/api';
import { useParams } from 'react-router-dom';
import { message, PageHeader, Row, Col } from 'antd';
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
const initState = {
  behavior: 'init',
  data: []
};
export const BlogItem = () => {
  const {id} = useParams();
  const [ post, setPost ] = useState({data: {}, route: ""});
  
  useEffect(()=>{
    const fetchPost = async () => {
      const re = await getRequest('blog', {}, [id]);
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
  },[id])

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
          <p style={{textAlign: 'justify'}}>{post.content}</p>
          <img src={post.img} alt="img-post" style={{maxWidth: "100%"}}/>
        </Col>
      </Row>
    </>
  )
}