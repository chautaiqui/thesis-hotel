import React, {useState, useEffect} from 'react';
import { getRequest } from '../../pkg/api';

import { useLocation, useParams, useHistory } from 'react-router-dom';
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
const initState = {
  behavior: 'init',
  data: []
};
export const Blog = () => {
  const [ state,setState ] = useState(initState);
  const history = useHistory();
  const getData = async () => {
    const res = await getRequest('blog');
    if(res.success) {
      setState({
        behavior: 'stall',
        data: res.result
      })
    }
  }
  const blogClick = (item) => {
    history.push(`/blog/${item._id}`);
  };
  useEffect(()=>{
    switch (state.behavior) {
      case 'init':
        getData();
        return;
      case 'stall':
        return
      default:
        break;
    }
  },[state]);
  console.log(state);
  return (
    <>
      <Row gutter={[16,16]} style={{marginTop: 50}}>
        {
          state.data.map((item, index) => {
            return (
              <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}
                onClick={()=>{
                  blogClick(item)
                }}
              >
                <img src={item.img} alt='blog' style={{maxWidth: '100%'}}/>
                <p style={{textAlign: 'center', fontWeight: 500}}>{item.title}</p>
              </Col>
            )
          })
        }
      </Row>
    </>
  )
}


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