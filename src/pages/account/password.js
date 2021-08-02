import React, { useState, useContext } from 'react';
import { Form, Input, Button  } from 'antd';
import { postMethod, putMethod } from '../../pkg/api';
import { messageError, messageSuccess } from '../../commons';
import { User } from "../../pkg/reducer";

export const Password = () => {
  const [ user, dispatchUser] = useContext(User.context);
  const [ form ] = Form.useForm();
  const [ loading, setLoading ] = useState(false);

  const onFinish = (values) => {
    const validate = async () => {
      setLoading(true);
      const res = await postMethod("customer/login", {
        email: user.email,
        password: values.current_password,
      });
      if (!res.success) {
        messageError("Error", "Password invaild!");
        return;
      }
      var data = {
        password: values.new_password,
      };
      var fd = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (value) {
          fd.append(key, value);
        }
      }
      const res1 = await putMethod("customer", fd, user._id);
      if (res1.success) {
        messageSuccess("Change password","Successfully!");
        localStorage.setItem("api_token", values.new_password);
        setLoading(false);
        form.resetFields();
        return;
      } else {
        messageError("Error",res1.error);
        setLoading(false);
        return;
      }
    };
    validate();
  }
  return<>
    <Form
      form={form}
      style={{
        marginTop: 50
      }}
      name="normal_account"
      className="account-form"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14, offset: 2 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="current_password"
        label="Current Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="new_password"
        label="New Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["new_password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("new_password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error(
                  "The two passwords that you entered do not match!"
                )
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 8 }}>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-update"
          loading={loading}
        >
          Change
        </Button>
      </Form.Item>
    </Form>
  </>
}