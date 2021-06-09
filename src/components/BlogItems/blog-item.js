import React from "react";
// import { getRequest } from '../pkg/api';
import Carousel from "react-multi-carousel";
import { Card } from "antd";
import "react-multi-carousel/lib/styles.css";

import "./styles.scss";

export const BlogItem = (props) => {
  const { search, blog } = props;
  return (
    <Carousel
      additionalTransfrom={0}
      arrows={false}
      autoPlaySpeed={3000}
      autoPlay={false}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass={false}
      draggable={false}
      focusOnSelect={false}
      infinite
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={true}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          paritialVisibilityGutter: 30,
        },
        small: {
          breakpoint: { max: 1800, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          paritialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          paritialVisibilityGutter: 40,
        },
      }}
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
      className="carousel-blog"
    >
      {blog.map((item, index) => {
        return (
          <div className="blog-img" key={index}>
            <img
              className="main-img"
              src={item.img}
              alt="hinh"
              onClick={() => search(`/blog/${item._id}`)}
            />
            <p className="blog-title">{item.title}</p>
            <p className="blog-content">{item.content}</p>
          </div>
        );
      })}
    </Carousel>
  );
};
