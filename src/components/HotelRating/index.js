import React, { useState } from "react";
import { Rate, Input, Form, Button, message } from "antd";
import { useHistory } from "react-router";

import "./styles.scss";
import { postMethod } from "../../pkg/api";

const { TextArea } = Input;

const HotelRating = ({ user, hotelId }) => {
  const [valueRating, setValueRating] = useState();
  const history = useHistory();

  const { img } = user;

  const handleChange = (value) => {
    setValueRating(value);
  };

  const onFinish = (values) => {
    const data = {
      customer: user._id,
      rating: values.rating,
      comment: values.comment,
    };
    const rating = async () => {
      const res = await postMethod(`/hotel/${hotelId}/rating`, data);
      if (res.success) {
        message.success("Rating sucessful!");
      } else {
        message.error(res.error);
        return;
      }
    };
    rating();
    setTimeout(() => {
      history.go("/");
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="comment">
      <div className="avatar">
        <img src={img} alt="avt" />
      </div>
      <div className="body">
        <Form
          name="basic"
          labelCol={{
            span: 0,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="comment">
            <TextArea />
          </Form.Item>
          <Form.Item name="rating">
            <Rate
              value={valueRating}
              onChange={(value) => handleChange(value)}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default HotelRating;
