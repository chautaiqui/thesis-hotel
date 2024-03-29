import React, { useContext } from "react";
import { User } from "../../pkg/reducer";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { postMethod } from "../../pkg/api";
import "./login.style.css";
import { messageError, messageSuccess } from "../../commons";
export const Login = () => {
  const [user, dispatchUser] = useContext(User.context);
  const history = useHistory();
  console.log(user);

  const onFinish = (values) => {
    var format = /[A-Za-z0-9_]@[A-Za-z0-9_]+\.[A-Za-z0-9_]/;
    if (!format.test(values.email)) {
      // message.error("Email error format!");
      messageError("Error", "Email invalid format!")
      return;
    }
    const fetchUser = async () => {
      const res = await postMethod("customer/login", {
        email: values.email,
        password: values.password,
      });
      if (res.success) {
        // message.success("Loading!");
        messageSuccess("Log in", "Success")
        // console.log(res);
        dispatchUser({
          type: "LOGIN",
          user: res.result.customer,
          email: values.email,
          api_token: values.password,
        });
        history.replace("/");
        window.location.reload();
      } else {
        // message.error(res.error);
        messageError("Error", res.error)
        return;
      }
    };
    fetchUser();
  };
  return (
    <div>
      <Row
        style={{
          height: 200,
          justifyContent: "center",
        }}
        className="header-pic"
      >
        <Col style={{ lineHeight: "200px" }}></Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 40 }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Row>
            <Col span={12}>
              <h2>Fast Booking</h2>
              <img
                alt="simple"
                src="https://cdn.adsplay.xyz/vod/2021/05/0421bbd72ecdf96591342458b0d6905d_6527.png"
                style={{ maxWidth: "100%" }}
              />
            </Col>
            <Col span={12}>
              <h2>Simple Function</h2>
              <img
                alt="func"
                src="https://cdn.adsplay.xyz/vod/2021/05/d14f3aeb9d84c4f86d469957025eddd4_1480.png"
                style={{ maxWidth: "100%" }}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card
            className={"height-50 card"}
            title="Login"
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
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                You don't have a account?{" "}
                <a href="/signup">
                  <mark>Click here</mark>
                </a>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
