import React from "react";
// import { getRequest } from '../pkg/api';
import Carousel from "react-multi-carousel";
import { Card } from "antd";
import "react-multi-carousel/lib/styles.css";

export const BlogItem = (props) => {
  const { search, blog } = props;
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      autoPlay={true}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass={false}
      draggable
      focusOnSelect={false}
      infinite
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={true}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 3,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
      }}
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
      itemClass="carousel-item-padding-10-px"
    >
      {blog.map((item, index) => {
        return (
          <Card
            cover={
              <img
                alt="example"
                src={
                  item.img || "https://res.cloudinary.com/hotellv/image/upload/v1620922817/q84uupghxhgbau5wk542.jpg"
                }
              />
            }
            key={index}
            style={{
              padding: 5,
              cursor: "pointer",
            }}
            onClick={() => {
              search(`/blog?id=${item._id}`);
            }}
          >
            <Card.Meta title={item.title} />
          </Card>
        );
      })}
    </Carousel>
  );
};
