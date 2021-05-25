import React, { useContext, useEffect } from 'react'
import { Row, Col, Avatar, Tabs, Form, Input, DatePicker, Button, message } from 'antd';
import { EditText } from 'react-edit-text';
import { User } from '../../pkg/reducer';
import 'react-edit-text/dist/index.css';
import moment from 'moment';
import './account.style.css';
import { postRequest, putRequest } from '../../pkg/api';
import { CustomUpload } from '../../commons';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const Account = () => {
  const [ user ] = useContext(User.context);
  const [ form ] = Form.useForm();
  const [ form_pass ] = Form.useForm();

  useEffect(()=>{
    form.setFieldsValue({
      email: user.email, 
      name: user.name,
      dateOfBirth: moment(user.birthday, 'YYYY-MM-DD'),
      contactNumber: user.phone,
      address: user.address
    });
    // get api booking
    // setBooking(data);
  },[user])
  const onFinish = values => {
    console.log(values);
    const data = {
      email: values.email,
      name: values.name,
      birthday: values.dateOfBirth.format( 'DD-MM-YYYY', 'DD/MM/YYYY' ),
      phone: values.contactNumber,
      address: values.address,
    }
    var fd = new FormData();
    for (const [key, value] of Object.entries(data)){
      if(value) {
        fd.append(key, value)
      }
    }
    if(values.img.length !== 0) {
      fd.append('img', values.img[0])
    }
    const updateInfo = async () => {
      const res = await putRequest('customer', fd, user._id);
      if(res.success) {
        message.success('Updated infomation successfully!');
        window.location.reload();
      } else {
        message.error(res.error);
      }
    }
    updateInfo();
  }
  const changePassword = values => {
    const validate = async () => {
      const res = await postRequest('customer/login',{email:user.email, password: values.current_password});
      if(!res.success) {
        message.error("Password error!");
        return;
      }
      var data = {
        email: user.email,
        birthday: moment(user.birthday).format( 'DD-MM-YYYY', 'DD/MM/YYYY' ),
        name: user.name,
        phone: user.phone,
        address: user.address,
        password: values.new_password
      }
      var fd = new FormData();
      for (const [key, value] of Object.entries(data)){
        if(value) {
          fd.append(key, value)
        }
      }
      const res1 = await putRequest('customer', fd, user._id);
      if(res1.success) {
        message.success('Change password successfully!');
        localStorage.setItem('api_token', values.new_password);
      } else {
        message.error(res1.error);
      }
    }
    validate();
  }
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
          <Avatar size={40} src={user.img}></Avatar>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Infomation" key="1">
              <Form
                form={form}
                name="normal_account"
                className="account-form"
                {...formItemLayout}
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  label="Email"
                >
                  <EditText className='custom-input' readonly/>
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Name"
                >
                  <EditText className='custom-input'/>
                </Form.Item>
                <Form.Item
                  name="dateOfBirth"
                  label="Birthday"
                >
                  <DatePicker/>
                </Form.Item>
                <Form.Item
                  name="contactNumber"
                  label="Phone"
                >
                  <EditText className='custom-input'/>
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
                >
                  <EditText className='custom-input'/>
                </Form.Item>
                <Form.Item name="img" label="Change avata">
                  <CustomUpload fileList={user.img}/>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Change password" key="2">
              <Form
                form={form_pass}
                {...{
                  labelCol: {
                    xs: {
                      span: 24,
                    },
                    sm: {
                      span: 10,
                    },
                  },
                  wrapperCol: {
                    xs: {
                      span: 24,
                    },
                    sm: {
                      span: 16,
                    },
                  },
                }}
                name="password"
                onFinish={changePassword}
              >
                <Form.Item name="current_password" label="Current Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    }
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item name="new_password" label="New Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['new_password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('new_password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Change
                  </Button>
                </Form.Item>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="History" key="3">
              History
            </Tabs.TabPane>
        </Tabs>
        </Col>
      </Row>
    </div>
  )
}
