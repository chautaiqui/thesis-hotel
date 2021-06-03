import moment from 'moment';
import React, {useState, useEffect, useContext} from 'react';
import { User } from '../../pkg/reducer';
import { getRequest, postMethod } from '../../pkg/api';
import { messageError, messageSuccess } from "../../commons";
import { VoucherItem } from '../../components/voucher-item';
import { Row, Col } from 'antd';
import './voucher.style.css';

const initState = {
  behavior: 'init',
  data: []
};
export const Voucher = () => {
  const [ state,setState ] = useState(initState);
  const [ user ] = useContext(User.context);
  const getData = async () => {
    const res = await getRequest('voucher/available');
    if(res.success) {
      setState({
        behavior: 'stall',
        data: res.result.vouchers
      })
    }
  }
  useEffect(()=>{
    switch (state.behavior) {
      case 'init':
        getData();
        return;
      case 'stall':
        return
      default:
        break;
    }
  },[state]);
  const getVoucher = (voucher) => {
    console.log(voucher, user)
    if(user._id) {
      // get voucher
      const get = async () => {
        const res = await postMethod(`voucher/${voucher._id}/get`, {customer: user._id});
        if(res.success) {
          messageSuccess('Success','Get voucher successfully! Please check voucher in account information.')
        } else {
          console.log('error', typeof res.error)
          messageError('Get voucher error',res.error);
        }
      }
      get();
    } else {
      // must login
      messageError("Error to get voucher",'You must login to use this function')
    }
  }
  return (
    <Row gutter={[16,16]} style={{marginTop: 10}}>
    {
      state.data.map((item, index) => {
        return (
          <Col key={index} xs={24} sm={12} md={12} lg={12} xl={12}>
            <VoucherItem hotel={item.hotel.name} getVoucher={getVoucher} voucher={item} discount={item.discount} roomType={item.roomType.name} endDate={moment(item.endDate).format('DD-MM-YYYY')}/>
          </Col>
        )
      })
    }
  </Row>
  )
}

export const VoucherHome = (props) => {
  const { data = [], getVoucher=()=>{} } = props;
  return (
    <Row gutter={[16,16]} style={{marginTop: 10}}>
    {
      data.map((item, index) => {
        return (
          <Col key={index} xs={24} sm={24/data.length}>
            <VoucherItem hotel={item.hotel.name} voucher={item} getVoucher={getVoucher} discount={item.discount} roomType={item.roomType.name} endDate={moment(item.endDate).format('DD-MM-YYYY')}/>
          </Col>
        )
      })
    }
  </Row>
  )
}
