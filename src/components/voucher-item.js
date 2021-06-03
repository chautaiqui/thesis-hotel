import React from 'react';
import './css/voucher.style.css';

export const VoucherItem = props => {
  const { hotel, discount, roomType, endDate, getVoucher=()=>{}, voucher, view = false } = props;
  return <>
  <div className="coupon">
    <div className="container-voucher">
      <h3>{hotel}</h3>
    </div>
    <div className="container-voucher" style={{backgroundColor:"white"}}>
      <h2><b>{discount}% OFF YOUR PURCHASE</b></h2> 
    </div>
    <div className="container-voucher">
      <p>Use For Room Type: <span className="promo">{roomType}</span></p>
      <p className="expire">Expires: {endDate}</p>
      <p className="expire">Status: {voucher.docStatus}</p>
      {!view && (<button className='btn' onClick={()=>{getVoucher(voucher)}}>Get voucher</button>)}
    </div>
  </div></>
}