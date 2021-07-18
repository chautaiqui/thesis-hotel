import React, { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Avatar,
  Tabs,
  Form,
  Input,
  DatePicker,
  Button,
  message,
  Card,
} from "antd";
import axios from "axios";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import moment from "moment";

import "./account.style.css";
import { User } from "../../pkg/reducer";
import { getRequest, postMethod, putMethod } from "../../pkg/api";
import { CustomUpload } from "../../commons";
import { VoucherItem } from "../../components/voucher-item";
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
  const [user, dispatchUser] = useContext(User.context);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [form_pass] = Form.useForm();
  const [avt, setAvt] = useState(user.img);
  const [booking, setHistory] = useState([]);

  useEffect(() => {
    setAvt(user.img);
  }, [user.img]);

  useEffect(() => {
    const fetchHistory = async () => {
      const re = await getRequest(`/customer/${user._id}/booking`);
      if (!re.success) {
        message.error(re.message);
      } else {
        if (re.result.length === 0) return;
        setHistory(re.result.bookings);
      }
    };
    fetchHistory();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const fetchHistory = async () => {
      const re = await getRequest(`/customer/${user._id}/booking`);
      if (!re.success) {
        message.error(re.message);
      } else {
        if (re.result.length === 0) return;
        setHistory(re.result.bookings);
      }
    };
    // fetchHistory();
    // eslint-disable-next-line
  }, [booking]);

  const deleteBooking = async (id) => {
    await axios.put(`https://hotel-lv.herokuapp.com/api/booking/${id}/cancel`);
    await message.success("Deleted");
  };

  useEffect(() => {
    form.setFieldsValue({
      email: user.email,
      name: user.name,
      dateOfBirth: moment(user.birthday, "YYYY-MM-DD"),
      contactNumber: user.phone,
      address: user.address,
    });
    // eslint-disable-next-line
  }, [user]);

  const onFinish = (values) => {
    const data = {
      email: values.email,
      name: values.name,
      birthday: values.dateOfBirth.format("DD-MM-YYYY", "DD/MM/YYYY"),
      phone: values.contactNumber,
      address: values.address,
    };
    var fd = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        fd.append(key, value);
      }
    }
    if (values.img.length !== 0) {
      fd.append("img", values.img[0]);
    }
    setLoading(true);
    const updateInfo = async () => {
      const res = await putMethod("customer", fd, user._id);
      if (res.success) {
        message.success("Updated infomation successfully!");
        form.setFieldsValue(res.result);
        dispatchUser({ type: "UPDATE", user: res.result });
        setLoading(false);
        return;
      } else {
        message.error(res.error);
        setLoading(false);
        return;
      }
    };
    updateInfo();
  };
  const changePassword = (values) => {
    const validate = async () => {
      setLoading(true);
      const res = await postMethod("customer/login", {
        email: user.email,
        password: values.current_password,
      });
      if (!res.success) {
        message.error("Password error!");
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
        message.success("Change password successfully!");
        localStorage.setItem("api_token", values.new_password);
        setLoading(false);
        form_pass.resetFields();
        return;
      } else {
        message.error(res1.error);
        setLoading(false);
        return;
      }
    };
    validate();
  };
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
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
                <Form.Item name="email" label="Email">
                  <EditText className="custom-input" readonly />
                </Form.Item>
                <Form.Item name="name" label="Name">
                  <EditText className="custom-input" />
                </Form.Item>
                <Form.Item name="dateOfBirth" label="Birthday">
                  <DatePicker />
                </Form.Item>
                <Form.Item name="contactNumber" label="Phone">
                  <EditText className="custom-input" />
                </Form.Item>
                <Form.Item name="address" label="Address">
                  <EditText className="custom-input" />
                </Form.Item>
                <Form.Item name="img" label="Change avata">
                  <CustomUpload fileList={avt} />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    loading={loading}
                  >
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
                      span: 10,
                    },
                  },
                }}
                name="password"
                onFinish={changePassword}
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
                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape={"round"}
                    loading={loading}
                  >
                    Change
                  </Button>
                </Form.Item>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="History" key="3">
              <Row gutter={[16, 16]}>
                {booking.map((item) => {
                  return item.bookingStatus === "cancelled" ? (
                    ""
                  ) : (
                    <Card
                      title={`Room ${item.room.name}`}
                      style={{ width: 300, marginLeft: 20 }}
                    >
                      <p>
                        Start booking :
                        {moment(item.bookingStart).format("DD MM YYYY")}{" "}
                        {item.name}
                      </p>
                      <p>
                        End booking :
                        {moment(item.bookingEnd).format("DD MM YYYY")}
                      </p>
                      <p>
                        status :
                        {item.bookingStatus === "pending" ? "Booked" : ""}
                      </p>
                      <Button danger onClick={() => deleteBooking(item._id)}>
                        Delete
                      </Button>
                    </Card>
                  );
                })}
              </Row>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Voucher" key="4">
              <Row gutter={[16, 16]}>
                {user.voucher.map((item, index) => {
                  return (
                    <Col key={index} xs={24} sm={12} md={12} lg={12} xl={12}>
                      <VoucherItem
                        hotel={item.hotel.name}
                        view={true}
                        voucher={item}
                        discount={item.discount}
                        roomType={item.roomType.name}
                        endDate={moment(item.endDate).format("DD-MM-YYYY")}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};
