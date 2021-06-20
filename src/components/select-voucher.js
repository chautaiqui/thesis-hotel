import React from 'react';
import { Select } from 'antd';

export const SelectVoucher = ({voucher = []}) => {
  return <>
    <h1>Voucher</h1>
    <Select 
      width="100%"
      placeholder="Select discount voucher"
      options={voucher.map((item) => ({label: item.discount, value: item._id}))}
      onChange={()=>{
        
      }}
    />
  </>
}