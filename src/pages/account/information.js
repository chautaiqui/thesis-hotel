import React, { useEffect, useState, useContext } from 'react';
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import {
  Form, Input, DatePicker, Button, message
} from "antd";
import { User } from "../../pkg/reducer";
import { CustomUpload, messageError, messageSuccess } from "../../commons";
import moment from 'moment';
import { putMethod } from '../../pkg/api';

export const Information = (props) => {
  const [ user, dispatchUser] = useContext(User.context);
  const [ form ] = Form.useForm();
  const [ loading, setLoading ] = useState(false);
  const [avt, setAvt] = useState(user.img);

  const updateInfo = async (data, id) => {
    const res = await putMethod("customer", data, id);
    if (res.success) {
      messageSuccess("Update information", "Successfully!");
      // form.setFieldsValue(res.result);
      dispatchUser({ type: "UPDATE", user: res.result });
      setLoading(false);
      return;
    } else {
      messageError("Error", res.error);
      setLoading(false);
      return;
    }
  };
  const onFinish = (values) => {
    console.log(values)
    setLoading(true);
    const data = {
      ...values, birthday: values.birthday.format("DD-MM-YYYY", "DD/MM/YYYY"), img: undefined
    }
    
    var fd = new FormData();
    if (values.img.length !== 0) {
      fd.append("img", values.img[0]);
    }

    for (const [key, value] of Object.entries(data)) {
      if (value) {
        fd.append(key, value);
      }
    }
    updateInfo(fd, user._id);
  }
  useEffect(()=>{
    const { email, name, birthday, phone, address } = user;
    form.setFieldsValue({
      email, name, birthday: moment(birthday, "YYYY-MM-DD"), phone, address
    })
  },[props])
  return<>
    <Form
      form={form}
      name="normal_account"
      className="account-form"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14, offset: 2 }}
      onFinish={onFinish}
    >
      <Form.Item name="email" label="Email">
        <EditText className="custom-input" readonly />
      </Form.Item>
      <Form.Item name="name" label="Name">
        <EditText className="custom-input" />
      </Form.Item>
      <Form.Item name="birthday" label="Birthday">
        <DatePicker />
      </Form.Item>
      <Form.Item name="phone" label="Phone">
        <EditText className="custom-input" />
      </Form.Item>
      <Form.Item name="address" label="Address">
        <EditText className="custom-input" />
      </Form.Item>
      <Form.Item name="img" label="Avatar">
        <CustomUpload fileList={avt}/>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 8 }}>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-update"
          loading={loading}
        >
          Update
        </Button>
      </Form.Item>
    </Form>
  </>
}