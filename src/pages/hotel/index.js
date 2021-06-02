import { message, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getRequest } from "../../pkg/api";
import { Row, Col, Pagination } from "antd";
import { HotelItem } from "../../components/hotel-item";

// const url =
// "https://res.cloudinary.com/hotellv/image/upload/v1621233855/tmsvnhfbf7vcmks132jy.jpg";
export const Hotel = () => {
  var location = useLocation();
  const history = useHistory();
  const [lstHotel, setLstHotel] = useState([]);
  var param = location.search
    .slice(1)
    .split("&")
    .reduce(
      (r, i) => Object.assign({}, r, { [i.split("=")[0]]: i.split("=")[1] }),
      {}
    );
  const [query, setQuery] = useState(param);
  const [sort, setSort] = useState("high");

  useEffect(() => {
    console.log(param);
    const getHotel = async () => {
      const res = await getRequest("hotel");
      console.log(res);
      if (res.success) {
        setLstHotel(res.result.hotels);
      } else {
        message.error("Something error!");
      }
    };
    getHotel();
  }, [query]);
  useEffect(() => {
    // const numArray = numArray.sort((a, b) => a - b);
  }, [sort]);
  const hotelClick = (item) => {
    console.log(item);
    history.push(`/hotel/detail?id=${item._id}`);
  };
  console.log(lstHotel);
  return (
    <>
      <Select
        placeholder="Sort"
        options={[
          { label: "Price: Low to High", value: "low" },
          { label: "Price: High to Low", value: "high" },
        ]}
        onChange={(v) => setSort(v)}
        style={{ width: "25%" }}
      />
      <Row gutter={[16, 16]} style={{ marginTop: 50 }}>
        {lstHotel.map((item, index) => {
          return (
            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
              <HotelItem
                name={item.name}
                address={`${item.street}, ${item.ward}, ${item.district}, ${item.province}`}
                rate={5}
                price={item.averagePrice.avgValue}
                img={item.imgs[0]}
                redirect={() => {
                  hotelClick(item);
                }}
              />
            </Col>
          );
        })}
      </Row>
      <Pagination
        style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
        defaultCurrent={1}
        total={lstHotel.length}
        onChange={(page) => {
          console.log(page);
        }}
      />
    </>
  );
};
