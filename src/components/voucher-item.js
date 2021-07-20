import React from "react";
import { Button, Row, Col, Avatar } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import moment from "moment";
import "./css/voucher.style.scss";

const formatNumber = (num, currency = "") => 
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.') + " " + currency
;

export const VoucherItem = (props) => {
  const { getVoucher = () => {}, voucher, view = false } = props;
  return (
    <Row gutter={[16,16]} style={{border: "1px solid", borderRadius: 10, width: "100%"}}>
      <Col xs={24} sm={8} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <img src={voucher.img} alt="" style={{maxWidth: "100%"}}/>
      </Col>
      <Col xs={24} sm={16}>
        <Row gutter={[16,16]}>
          <Col span={24} style={{fontSize: "x-large", color: '#000'}}>
            {voucher.hotel.name}
          </Col>
          <Col span={24} style={{color: 'red', fontWeight: 700}}>
            {voucher.discount}% OFF YOUR PURCHASE
          </Col>
          <Col span={24} style={{color: '#000', fontWeight: 600}}>
            Limit: {formatNumber(voucher.discountLimit, "VND")}
          </Col>
          <Col span={24} style={{color: '#000', fontWeight: 600}}>
            Room type: {voucher.roomType.name}
          </Col>
          <Col span={24} style={{color: 'red', fontWeight: 700}}>
            Expires: {moment(voucher.endDate).format('DD-MM-YYYY')}
          </Col>
          {!view && <Col span={24} style={{marginBottom: 10}}>
            <Button
              onClick={() => getVoucher(voucher)}
              type="primary"
              shape="round"
              className="btn-update"
              icon={<WalletOutlined />}
            >
              Get Voucher
            </Button>
          </Col>}
        </Row>
      </Col>
    </Row>
  );
};
