import React from "react";
import { Row, Col, Card, Form, Input, DatePicker, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import { postRequest } from "../../pkg/api";

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

export const Signup = () => {
  const history = useHistory();
  const onFinish = (values) => {
    const { address, birthday, password, email, name, phone } = values;
    var format = /[A-Za-z0-9_]@[A-Za-z0-9_]+\.[A-Za-z0-9_]/;
    if (!format.test(email)) {
      message.error("Email error format!");
      return;
    }
    if (password.length < 7) {
      message.error("Password least 8 character!");
      return;
    }
    if (phone.length < 9 || phone.length > 11) {
      message.error("Phone error!");
      return;
    }
    console.log(values);
    const data = {
      email: email,
      password: password,
      name: name,
      birthday: birthday.format("DD-MM-YYYY", "DD/MM/YYYY"),
      phone: phone,
      address: address,
    };
    const createUser = async () => {
      const res = await postRequest("customer/signup", data);
      console.log(res);
      if (res.success) {
        message.success("Create account sucessfully!");
        console.log(res);
        history.push("/login");
      } else {
        message.error(res.error);
      }
    };
    createUser();
  };
  return (
    <div>
      <Row
        style={{ height: 200, background: "#3390FF", justifyContent: "center" }}
        gutter={[16, 16]}
      >
        <Col style={{ lineHeight: "200px" }}>
          <h3>Sign up for more promotions and benefits</h3>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <h2>Fast Booking</h2>
              <img
                alt="fast"
                src="https://cdn.adsplay.xyz/vod/2021/05/0421bbd72ecdf96591342458b0d6905d_6527.png"
                style={{ maxWidth: "100%" }}
              />
            </Col>
            <Col span={12}>
              <h2>Simple Function</h2>
              <img
                alt="simple"
                src="https://cdn.adsplay.xyz/vod/2021/05/d14f3aeb9d84c4f86d469957025eddd4_1480.png"
                style={{ maxWidth: "100%" }}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card
            className={"height-50 card"}
            title="Register"
            bordered={false}
            style={{
              width: "100%",
              borderRadius: 15,
              boxShadow: "rgb(0 0 0 / 12%) 0px 2px 10px",
            }}
          >
            <Form
              name="normal_login"
              className="login-form"
              {...formItemLayout}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
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
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
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
              <Form.Item
                name="name"
                label="Name"
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="birthday"
                label="Birthday"
                rules={[
                  {
                    required: true,
                    message: "Please select your birthday!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  // addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                />
                You have a account?{" "}
                <a href="/login">
                  <mark>Click here</mark>
                </a>
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
