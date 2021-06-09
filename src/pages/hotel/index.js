import { message, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getRequest } from "../../pkg/api";
import { Row, Col, Pagination, Button, Form, Input, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { HotelItem } from "../../components/hotel-item";
import "./hotel.style.css";

// const url =
// "https://res.cloudinary.com/hotellv/image/upload/v1621233855/tmsvnhfbf7vcmks132jy.jpg";

export const Hotel = () => {
  var location = useLocation();
  const history = useHistory();
  const [lstHotel, setLstHotel] = useState([]);
  const [form] = Form.useForm();
  var param = location.search
    .slice(1)
    .split("&")
    .reduce(
      (r, i) => Object.assign({}, r, { [i.split("=")[0]]: i.split("=")[1] }),
      {}
    );
  const [query, setQuery] = useState(param);

  useEffect(() => {
    console.log(query);
    form.setFieldsValue(query);
    const params = [];
    for (const [key, value] of Object.entries(query)) {
      if (query[key]) params.push(`${key}=${value}`);
    }
    history.push({
      path: "hotel",
      search: `?${params.join("&")}`,
    });
    const getHotel = async () => {
      const res = await getRequest("hotel", query);
      if (res.success) {
        setLstHotel(res.result.hotels);
      } else {
        message.error(res.error);
      }
    };
    getHotel();
  }, [query]);
  const hotelClick = (item) => {
    history.push(`/hotel/${item._id}`);
  };
  const onFinish = (value) => {
    setQuery(value);
  };
  console.log(lstHotel);
  return (
    <>
      <div className="hotel-filter">
        <Form name="search-filter" form={form} onFinish={onFinish}>
          <Row gutter={24}>
            <Col xs={24} sm={7} md={7} lg={6} xl={7}>
              <Form.Item label="Province" name="province">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={7} md={7} lg={7} xl={7}>
              <Form.Item label="Capacity" name="capacity">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={7} md={7} lg={7} xl={7}>
              <Form.Item label="Sort" name="averagePrice">
                <Select
                  placeholder="Sort"
                  options={[
                    { label: "Price: Low to High", value: "asc" },
                    { label: "Price: High to Low", value: "desc" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={3} md={3} lg={3} xl={3}>
              <Form.Item>
                <Button
                  icon={<SearchOutlined />}
                  type="primary"
                  htmlType="submit"
                  shape="round"
                >
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Row gutter={[16, 16]} style={{ marginTop: 50 }}>
        {lstHotel.length !== 0 ? (
          lstHotel.map((item, index) => {
            return (
              <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
                <HotelItem
                  name={item.name}
                  address={`${item.street}, ${item.ward}, ${item.district}, ${item.province}`}
                  rate={item.rated.avgValue}
                  price={item.averagePrice.avgValue}
                  img={item.imgs[0]}
                  redirect={() => {
                    hotelClick(item);
                  }}
                  description={item.description}
                />
              </Col>
            );
          })
        ) : (
          <Col span={24} style={{ marginBottom: 150 }}>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={
                <span>
                  <a href="/hotel">Hotel?</a>
                </span>
              }
            >
              <h1>No hotels found</h1>
            </Empty>
          </Col>
        )}
      </Row>
      {lstHotel.length !== 0 && (
        <Pagination
          style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
          defaultCurrent={1}
          total={lstHotel.length}
          onChange={(page) => {
            console.log(page);
          }}
        />
      )}
    </>
  );
};
