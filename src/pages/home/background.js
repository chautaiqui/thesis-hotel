import React from 'react';
import { Grid } from 'antd';
const { useBreakpoint } = Grid;

const breakPoint = (obj) => {
  const arr = Object.entries(obj).reverse();
  const temp = arr.filter((item) => item[1] === true);
  return temp[0] ? temp[0][0] : "xxl";
};

export const Background = (props) => {
  const screens = useBreakpoint();
  const breakP = breakPoint(screens);
  return <div>
    {breakP !== "xs" ? 
      <Pc /> : <Mobile />
    }
  </div>
}

const Pc = (props) => {
  return <div className="br-content-home">
    <img src="https://a0.muscache.com/im/pictures/a915ff27-6062-436d-a7a9-007685423f7b.jpg?im_w=1440" className="br-img-home"/>
    <div className="br-child-homepage">
      <h2 className="outdoors">
        The greatest <br />
        outdoors
      </h2> <br />
      <div>Wishlists curated by Hotel Booking</div>
      <div style={{marginTop: "5%"}}>
        <div className="btn-explore" onClick={()=>window.location.href = "/hotel"}>Explore</div>
      </div>
    </div> 
  </div>
}

const Mobile = (props) => {
  return <div className="br-content-home">
    <img src="https://a0.muscache.com/im/pictures/27a5b2c0-d954-4c8d-be6f-8db072cdfa45.jpg?im_w=720" className="br-img-home"/>   
    <div className="br-child-homepage">
      <h2 className="outdoors outdoors-mb">
        The greatest <br />
        outdoors
      </h2> <br />
      <div>Wishlists curated by Hotel Booking</div>
      <div style={{marginTop: "5%"}}>
        <div className="btn-explore" onClick={()=>window.location.href = "/hotel"}>Explore</div>
      </div>
    </div> 
  </div>
}