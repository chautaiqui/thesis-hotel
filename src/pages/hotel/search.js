import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';

export const SearchText = (props) => {
  const [ form ] = Form.useForm();
  const onFinish = (value) => {
    console.log(value)
  }
  return <Form form={form} layout="inline" onFinish={onFinish}>
    <Form.Item name="searchText">
       <Input 
        placeholder="Search"
        style={{
          borderRadius: 6
        }}
      />
    </Form.Item>
    <Form.Item>
      <Button
        className="rs-btn rs-btn-default"
        htmlType="submit"
        // style={{
        //   borderRadius: 6
        // }}
      >
        Search
      </Button>
    </Form.Item>
  </Form>
}