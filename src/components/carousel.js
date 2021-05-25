import React from 'react';
import InfiniteCarousel from 'react-leaf-carousel';
import { Carousel } from '3d-react-carousal';

const location = ['Ho Chi Minh', 'Ha Noi', 'Vung Tau', 'Nha Trang', 'Vung Tau', 'Phu Quoc', 'Da Nang', 'Hoi An'];
const url = 'https://ads-cdn.fptplay.net/static/banner/2021/05/238022d83feb880f42fd0dcf9c1a96ca_7780.png';
export const CarouselCus = (props) => {
  const { search = () => {}} = props;
  const handleClick = item => {
    search(`/hotel?province=${item}`);
  }
  
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
        sidesOpacity={.5}
        sideSize={.1}
        slidesToScroll={4}
        slidesToShow={4}
        scrollOnDevice={true}
      >
        {
          location.map((item, index)=>{
            return <div key={index} onClick={()=>{handleClick(item)}} style={{cursor: 'pointer'}}>
              <img src={url} alt="" />
              <p style={{textAlign: 'center', fontWeight: 'bolder'}}>{item}</p>
            </div>
          })
        }
      </InfiniteCarousel>
    </div>
  )
}


export const ImgCarousel = props => {
  const { imgs} = props;
  console.log(imgs)
  return <Carousel 
    slides={
      props.imgs.map((item, index) => <img src={item} alt={index}/>)
    } autoplay={true} interval={1000}
  />
}