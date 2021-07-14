import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CarouselCus } from "../../components/carousel";
import { Form, Input, Button, Row, Col, Divider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./home.style.css";
import { BlogItem } from "../../components/BlogItems/blog-item";
import { getRequest } from "../../pkg/api";
import { VoucherList } from "../voucher";
import TopRating from "../../components/TopRating";

export const Home = () => {
  const history = useHistory();
  const search = (param) => {
    history.push(param);
  };
  const [data, setData] = useState({ blog: [], voucher: [] });
  const onFinish = (values) => {
    console.log(values);
    if (values.location && values.capacity) {
      search(
        `/hotel?searchText=${values.location}&capacity=${values.capacity}`
      );
      return;
    }
    if (values.location) {
      search(`/hotel?searchText=${values.location}`);
      return;
    }
    if (values.capacity) {
      search(`/hotel?capacity=${values.capacity}`);
      return;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res1 = await getRequest("blog");
      const res2 = await getRequest("voucher/available");
      setData({
        blog: res1.result.blogs,
        voucher: res2.result.vouchers,
      });
    };
    getData();
  }, []);
  return (
    <div>
      <Divider orientation="left" plain>
        <h1>Where will you travel next?</h1>
      </Divider>
      <div className="br-homepage">
        <div className="content">
          <h2 className="outdoors">
            The greatest <br />
            outdoors
          </h2>
          <p>Wishlists curated by Hotel Booking</p>
        </div>
        <div className="on-form">
          <Form onFinish={onFinish} className="form-search">
            <Row
              gutter={[16, 16]}
              style={{
                background: " #fff",
                borderRadius: 10,
                boxShadow: "0 2px 10px rgb(0 0 0 / 12%)",
                paddingTop: 20,
                width: "100%",
              }}
            >
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <Form.Item name="location">
                  <Input placeholder="Location" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <Form.Item name="capacity">
                  <Input placeholder="Capacity" type="number" min="1" />
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={4}
                lg={4}
                xl={4}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Form.Item className="search-btn">
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    icon={<SearchOutlined />}
                  ></Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        {/* <img src={urlimg} alt='br' className="img-br"/> */}
      </div>
      <Divider orientation="left" plain>
        <h1>Voucher</h1>
      </Divider>
      <div>
        <a href="/voucher" className="view-more-blog" target="_blank">
          View more
        </a>
      </div>
      <VoucherList
        data={data.voucher}
        style={{ width: "100%", height: "230px" }}
      />
      <Divider orientation="left" plain>
        <h1>Browse by location</h1>
      </Divider>
      <CarouselCus search={search} />
      <Divider orientation="left" plain>
        <h1>Top Hotel</h1>
      </Divider>
      <TopRating />
      <Divider orientation="left" plain>
        <h1>Get inspiration for your next trip</h1>
      </Divider>
      <a href="/blog" className="view-more-blog">
        View more
      </a>
      <BlogItem blog={data.blog} search={search} />
      {/* <Blogs blog={data.blog} search={search} /> */}
    </div>
  );
};
