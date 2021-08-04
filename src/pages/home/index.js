import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CarouselCus } from "../../components/carousel";
import { Form, Input, Button, Row, Col, Divider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./home.style.css";
// import { BlogItem } from "../../components/BlogItems";
import { BlogItem } from "../../components/BlogItems/blog-item";
import { getRequest } from "../../pkg/api";
import { VoucherList } from "../voucher";
import TopRating from "../../components/TopRating";
import { CustomEmpty } from "../../commons/components/empty";
import { Background } from "./background";

export const Home = () => {
  const history = useHistory();
  const search = (param) => {
    // history.push(param);
    history.push({
      path: "hotel",
      search: param,
    });
    window.location.href = param;
  };
  const [data, setData] = useState({ blog: [], voucher: [], loading: true });
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
    search('/hotel')
  };
  const exploreClick = () => {
    window.location.href = "/hotel";
  }
  useEffect(() => {
    const getData = async () => {
      const res1 = await getRequest("blog/view-count" ,{ limit: 3});
      const res2 = await getRequest("voucher/available");
      setData({
        blog: res1.result,
        voucher: res2.result.vouchers,
        loading: false
      });
    };
    return getData();
  }, []);
  return (
    data.loading ? <CustomEmpty title="loading"/>: <div>
      <Divider orientation="left" plain>
        <h3>Where will you travel next?</h3>
      </Divider>
      {/* <div className="br-homepage">
        <div className="content">
          <h2 className="outdoors">
            The greatest <br />
            outdoors
          </h2>
          <p>Wishlists curated by Hotel Booking</p>
        </div>
        <div className="on-form btn-explore" onClick={exploreClick}>
          Explore
        </div>
      </div> */}
      <Background />

      <Divider orientation="left" plain>
        <h3>Browse by location</h3>
      </Divider>
      <CarouselCus search={search} />
      

      <Divider orientation="left" plain>
        <h3>Top Hotel</h3>
      </Divider>
      <TopRating />

      <Divider orientation="left" plain>
        <h3>Voucher</h3>
      </Divider>
      <div>
        <a href="/voucher" className="view-more-blog">
          View more
        </a>
      </div>
      <VoucherList
        data={data.voucher}
        style={{ width: "100%", height: "230px" }}
      />

      <Divider orientation="left" plain>
        <h3>Get inspiration for your next trip</h3>
      </Divider>
      <a href="/blog" className="view-more-blog">
        View more
      </a>
      {/* <BlogItem blog={data.blog} search={search} /> */}
      <BlogItem blog={data.blog} search={search} />
      {/* <Blogs blog={data.blog} search={search} /> */}
    </div>
  );
};
