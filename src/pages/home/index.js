import React, { useEffect, useState } from "react";
// import { User } from '../../pkg/reducer';
import { useHistory } from "react-router-dom";
import { CarouselCus } from "../../components/carousel";
import { Form, Input, Button, Row, Col, Divider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./home.style.css";
import { BlogItem } from "../../components/BlogItems/blog-item";
import { getRequest } from "../../pkg/api";
import { Blogs } from "../blog/blogs";
// const urlimg = 'https://ads-cdn.fptplay.net/static/banner/2021/05/17b8065615f6c42b421f1fd4fe9c8fd4_6051.jpg';

export const Home = () => {
  // const [ user, dispatchUser ] = useContext(User.context);
  const history = useHistory();
  const search = (param) => {
    history.push(param);
  };
  const [data, setData] = useState({ blog: [], voucher: [] });
  const onFinish = (values) => {
    console.log(values);
    if (values.location && values.guest) {
      search(`/hotel?province=${values.location}&guest=${values.guest}`);
      return;
    }
    if (values.location) {
      search(`/hotel?province=${values.location}`);
      return;
    }
    if (values.guest) {
      search(`/hotel?guest=${values.guest}`);
      return;
    }
  };

  useEffect(() => {
    console.log("first home");
    const getData = async () => {
      const res1 = await getRequest("blog");
      const res2 = await getRequest("voucher");
      console.log(res1, res2);
      setData({
        blog: res1.result,
        voucher: res2.result.vouchers,
      });
    };
    getData();
  }, []);
  console.log(data);
  return (
    <div>
      <Divider orientation="left" plain>
        <h1>Where will you travel next?</h1>
      </Divider>
      <div className="br-homepage">
        <div className="on-form">
          <Form onFinish={onFinish} className="form-search">
            <Row
              gutter={[16, 16]}
              style={{
                background: " #fff",
                borderRadius: 10,
                boxShadow: "0 2px 10px rgb(0 0 0 / 12%)",
                paddingTop: 20,
              }}
            >
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <Form.Item label="Location" name="location">
                  <Input placeholder="Location" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <Form.Item label="Guest" name="guest">
                  <Input placeholder="Guest" />
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xl={8}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Form.Item className="search-btn">
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    icon={<SearchOutlined />}
                  >
                    Search
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        {/* <img src={urlimg} alt='br' className="img-br"/> */}
      </div>
      <Divider orientation="left" plain>
        <h1>Browse by location</h1>
      </Divider>
      <CarouselCus search={search} />
      <Divider orientation="left" plain>
        <h1>Get inspiration for your next trip</h1>
      </Divider>
      <BlogItem blog={data.blog} search={search} />
      <Blogs blog={data.blog} search={search} />
    </div>
  );
};
