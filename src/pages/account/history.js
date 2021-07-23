import React, { useState, useContext, useEffect } from 'react';
import { messageError } from '../../commons';
import { getRequest } from '../../pkg/api';
import { User } from "../../pkg/reducer";
import { Row, Col } from 'antd';
import moment from 'moment';
import { TestTable } from './table-history';

export const History = (props) => {
  const [ user, dispatchUser ] = useContext(User.context);
  const [ data, setData ] = useState({data: [], history: false});
  const [ rerender, setRerender ] = useState(false);
  const fetchHistory = async () => {
    if(!user._id) return;
    const res = await getRequest(`customer/${user._id}/booking`);
    if(res.success) {
      console.log(res.result);
      setData({
        data: res.result.bookings,
        history: true
      })
    } else {
      messageError("Error", res.error);
    }

  }

  useEffect(()=>{
    if(user.booked) {
      fetchHistory();
    }
  },[user])
  useEffect(()=>{
    fetchHistory();
  },[props, rerender])
  
  return <Row gutter={[16,16]}>
    <Col>
      <TestTable data={data.data} rerender={()=>setRerender(!rerender)}/>
    </Col>
  </Row>
}
