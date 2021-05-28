import React, { useContext } from "react";
import { User } from "../pkg/reducer";
import { Headers } from "../components/header";
import { Layout, Row, Col } from "antd";
import {
  FacebookOutlined,
  SkypeOutlined,
  LinkedinOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import Footer from "../components/Footer/Footer";

const { Content } = Layout;

const MainLayout = (props) => {
  const { children } = props;
  const [user] = useContext(User.context);
  return (
    <Layout style={{ background: "#fff" }}>
      <div>
        <Headers isLogin={user.email ? true : false} />
      </div>
      <Content style={{ marginTop: 20 }}>
        <Row gutter={[16, 16]}>
          <Col span={20} offset={2} style={{ background: "#fff" }}>
            {children}
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
