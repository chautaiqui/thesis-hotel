import React from "react";
import InfiniteCarousel from "react-leaf-carousel";
import { Carousel } from "3d-react-carousal";

// import "./css/carousel.css";

const location = [
  "Ho Chi Minh",
  "Ha Noi",
  "Vung Tau",
  "Nha Trang",
  "Vung Tau",
  "Phu Quoc",
  "Da Nang",
  "Hoi An",
];
const url =
  "https://ads-cdn.fptplay.net/static/banner/2021/05/238022d83feb880f42fd0dcf9c1a96ca_7780.png";
export const CarouselCus = (props) => {
  const { search = () => {} } = props;
  const handleClick = (item) => {
    search(`/hotel?province=${item}`);
  };

  return (
    <div>
      <InfiniteCarousel
        breakpoints={[
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
        ]}
        dots={false}
        showSides={true}
        sidesOpacity={0.5}
        sideSize={0.1}
        slidesToScroll={4}
        slidesToShow={4}
        scrollOnDevice={true}
      >
        {location.map((item, index) => {
          return (
            <div
              className="carousel-explore"
              key={index}
              onClick={() => {
                handleClick(item);
              }}
              style={{ cursor: "pointer" }}
            >
              <img
                src={url}
                alt="hinh"
                style={{
                  width: "200px",
                  height: "200px",
                }}
              />
              <br />
              <span
                style={{
                  padding: "0 0 0 60px",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                {item}
              </span>
            </div>
          );
        })}
      </InfiniteCarousel>
    </div>
  );
};

export const ImgCarousel = (props) => {
  const { imgs } = props;
  console.log(imgs);
  return (
    <Carousel
      slides={props.imgs.map((item, index) => (
        <img src={item} alt={index} style={{ height: "31em", width: "auto" }} />
      ))}
      autoplay={true}
      interval={3500}
    />
  );
};
