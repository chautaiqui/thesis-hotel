import React, { useContext } from 'react';
import { User } from '../pkg/reducer';
import { Headers } from '../components/header';
import { Layout, Row, Col } from 'antd';
import { FacebookOutlined, SkypeOutlined, LinkedinOutlined, PhoneOutlined } from '@ant-design/icons';
const { Content, Footer } = Layout;

const MainLayout = props => {
  const { children } = props;
  const [ user ] = useContext(User.context);
  return (
    <Layout style={{background: '#fff'}}>
      <div>
        <Headers isLogin={user.email ? true : false}/>
      </div>
      <Content style={{marginTop: 20}}>
        <Row gutter={[16,16]}>
          <Col span={20} offset={2} style={{background: '#fff'}}>
            {children}
          </Col>
        </Row>
      </Content>
      <Footer style={{background: '#fff', textAlign: 'center'}}>
        <Row gutter={[16, 16]} style={{marginTop: 20}}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="footer">
          <h3 className='fontw'>Happy hotel</h3>
          <p>Careers</p>
          <p>Privacy</p>
          <p>Document</p>
          <p>About</p>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="footer">
          <h3 className='fontw'>Contact Us</h3>
          <p><FacebookOutlined /> Facebook</p>
          <p><SkypeOutlined /> Skype</p>
          <p><LinkedinOutlined /> Linked</p>
          <p><PhoneOutlined /> (+84) 353051289</p>
        </Col>
      </Row>
      </Footer>
    </Layout>
  )
}

export default MainLayout;