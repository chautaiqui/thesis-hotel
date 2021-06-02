import React from "react";
import InfiniteCarousel from "react-leaf-carousel";
import { Carousel } from "3d-react-carousal";

import "./css/carousel.css";

const location = [
  {name: "Ho Chi Minh", src:"https://ads-cdn.fptplay.net/static/banner/2021/06/449b4879f77b63066602ec54c57e4c31_2299.png"},
  {name: "Da Lat", src: "https://ads-cdn.fptplay.net/static/banner/2021/06/53771383b5063a918d1c865d377cfa30_686.png"},
  {name: "Ha Noi", src: "https://ads-cdn.fptplay.net/static/banner/2021/06/4187c4575f19a0b34cb6358c5590a449_4657.png"},
  {name: "Vung Tau", src: "https://ads-cdn.fptplay.net/static/banner/2021/06/d656c4bb699d21329842d78137d5d0b5_8126.png"},
  {name: "Nha Trang", src: "https://ads-cdn.fptplay.net/static/banner/2021/06/0f50d971b765f6506fe4c1656cdce104_8159.png"},
  {name: "Phu Quoc", src: "https://ads-cdn.fptplay.net/static/banner/2021/06/0f50d971b765f6506fe4c1656cdce104_8159.png"},
  {name: "Da Nang", src: "https://ads-cdn.fptplay.net/static/banner/2021/06/749a11b415428a5266bee41c9884e575_6950.png"},
  {name: "Hoi An", src: "https://ads-cdn.fptplay.net/static/banner/2021/06/b709110fd348bafbfdb4b672cf8fdb83_8791.png",}
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
        slidesToShow={6}
        scrollOnDevice={true}
      >
        {location.map((item, index) => {
          return (
            <div
              className="carousel-explore"
              key={index}
              onClick={() => {
                handleClick(item.name);
              }}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.src}
                alt="hinh"
                style={{
                  maxWidth: "350px",
                  height: "200px",
                  borderRadius: "5px",
                }}
              />
              <br />
              <p
                style={{
                  // padding: "0 0 0 60px",
                  // fontSize: "15px",
                  fontWeight: 500,
                  textAlign: 'center'
                }}
              >
                {item.name}
              </p>
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
