import React, { useEffect } from 'react';
import { Row, Col, Form, Input, Button, Tag } from 'antd';

export const SearchText = (props) => {
  const { appendQuery=()=>{}, clearQuery=()=>{}, query={} } = props;
  const [ form ] = Form.useForm();
  const onFinish = (value) => {
    appendQuery(value);
  }
  useEffect(()=>{
    if(query.searchText) form.setFieldsValue({searchText: query.searchText});
    else {
      form.resetFields();
    }
  },[props])
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
        type='primary'
        htmlType="submit"
        style={{
          borderRadius: 6
        }}
      >
        Search
      </Button>
    </Form.Item>
    <Form.Item>
      <Tag
        closable
        visible={query.searchText}
        onClose={()=>clearQuery("searchText")}
        color="#87d068"
      >
        Search text: {query.searchText}
      </Tag>
    </Form.Item>
  </Form>
}