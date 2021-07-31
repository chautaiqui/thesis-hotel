import React, { useState } from 'react';
import { Table, Tag, Row, Col, Button, Modal, Form, Rate, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import './account.style.css';
import { getRequest, postMethod, putMethod } from '../../pkg/api';
import { messageError, messageSuccess } from '../../commons';
const { confirm } = Modal;


const SumBooking = ({record}) => {
  return <Row gutter={16,16}>
    <Col span={24}>
      <strong>Hotel: </strong> {record.hotel.name}
    </Col>
    <Col span={24}>
      <strong>Room: </strong> {record.room.name}
    </Col>
    <Col span={24}>
      <strong>Room Type: </strong> {record.room.roomType.name}
    </Col>
    <Col span={24}>
      <strong>Start Date: </strong> {moment(record.bookingStart).format("DD/MM/YYYY")}
    </Col>
    <Col span={24}>
      <strong>End Date: </strong> {moment(record.bookingEnd).format("DD/MM/YYYY")}
    </Col>
    <Col span={24}>
      <strong>Total: </strong> {record.totalMoney.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    }) }
    </Col>
  </Row>
}

export const TestTable = (props) => {
  const { data, rerender = () => {} } = props;
  const [ state, setState ] = useState({visible: false, id: ""});
  const [ form ] = Form.useForm();
  const cancelBooking = async (record) => {
    const res = await putMethod("booking", {} ,`${record._id}/cancel`);
    // console.log(res.result)
    if(res.success) {
      messageSuccess("Success", "Cancel booking success!");
      rerender();
    } else {
      messageError("Error", res.error);
    }
  }

  function showConfirm(record) {
    confirm({
      title: 'Do you want to cancel booking?',
      icon: <ExclamationCircleOutlined />,
      content: <SumBooking record={record}/>,
      onOk() {
        cancelBooking(record)
      },
      onCancel() {
        return;
      },
    });
  }
  const columns = [
    {
      title: 'Hotel',
      key: 'hotel',
      align: 'center',
      render: record => <a>{record.hotel.name}</a>,
    },
    {
      title: 'Room',
      key: 'room',
      align: 'center',
      render: record => record.room.name
    },
    {
      title: 'Room Type',
      key: 'roomType',
      align: 'center',
      render: record => record.room.roomType.name
    },
    {
      title: 'Total',
      key: 'roomType',
      align: 'center',
      render: record => record.totalMoney.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      }) 
    },
    {
      title: 'Start date',
      key: 'startDate',
      align: 'center',
      render: record => moment(record.bookingStart).format("DD/MM/YYYY")
    },
    {
      title: 'End date',
      key: 'endDate',
      align: 'center',
      render: record => moment(record.bookingEnd).format("DD/MM/YYYY")
    },
    {
      title: 'Status',
      key: 'status',
      align: 'center',
      render: record => {
        var color = record.bookingStatus === "pending"  ? "geekblue" : (record.bookingStatus === "completed" ? "green" : "volcano")
        return <Tag color={color}>{record.bookingStatus.toUpperCase()}</Tag>
      }
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: record => {
        var action = record.bookingStatus === "pending"  ? true : false;
        return action ? <Button className="btn-cancel-booking" onClick={()=>showConfirm(record)}>Cancel</Button> : <div></div>
      }
    },
    {
      title: 'Review',
      key: 'review',
      align: 'center',
      render: record => {
        return (!record.reviewed && record.isPaid) ? <Button className="btn-cancel-booking" onClick={()=>setState({visible: true, id: record._id})}>Review</Button> : <div></div>
      }
    },

  ];
  const reviews = async (data, id) => {
    const res = await postMethod(`booking-review/booking/${id}`, data);
    if (res.success) {
      setState({visible:false, id: ""});
      messageSuccess("Review Successfully!", "Thanks for reviewing booking!");
    } else {
      setState({visible:false, id: ""});
      messageError("Error", res.error);
    }
    rerender();
  }
  const handleCancel = () => {
    setState({visible: false});
    form.resetFields();
  }
  const handleOk = (id) => {
    if (state.id === "") return;
    var data = form.getFieldsValue();
    console.log(state.id, data)
    reviews(data, state.id)
  }
  return <>
    <Table 
      columns={columns} 
      dataSource={data} 
      rowKey={"_id"}  
      tableLayout="auto"
      size="small"
      pagination={false}
      scroll={{ x: 992 }}
    />
    <Modal
      centered
      title="Review Booking"
      visible={state.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <div>
          <Button className="btn-rating" onClick={handleCancel}>Cancel</Button>
          <Button type="primary" className="btn-rating" onClick={handleOk}>Reviews</Button>
        </div>
      }
    >
      <Form form={form}>
        <Form.Item 
          label="Review"
          name="review"
          rules={[
            {
              required: true,
              message: 'Please input your review!',
            },
          ]}
        >
          <Input.TextArea/>
        </Form.Item>
        <Form.Item 
          label="Rating"
          name="rating"
          rules={[
            {
              required: true,
              message: 'Please rate your star!',
            },
          ]}
        >
          <Rate style={{color: '#a0d911'}}/>
        </Form.Item>
      </Form>
    </Modal>
  </>
}