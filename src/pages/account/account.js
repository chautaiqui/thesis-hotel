import React from 'react';
import { Information } from './information';
import { Password } from './password';
import { Voucher } from './voucher';
import { History } from './history';

export const AccountContent = (props) => {
  const  { keyItem, user } = props;
  
  return <>
  {
    keyItem === 1 && <Information/>
  }
  {
    keyItem === 2 && <Password />
  }
  {
    keyItem === 3 && <History />
  }
  {
    keyItem === 4 && <Voucher voucher={user.voucher}/>
  }
  </>
}