import React from "react";
import { Button } from "antd";
import { WalletOutlined } from "@ant-design/icons";

import "./css/voucher.style.scss";

export const VoucherItem = (props) => {
  const {
    hotel,
    discount,
    discountLimit,
    roomType,
    img,
    endDate,
    getVoucher = () => {},
    voucher,
    view = false,
  } = props;
  return (
    <>
      <div className="voucher-item">
        <div className="voucher-img">
          <img src={voucher.img} alt="hinh" />
        </div>
        <div className="voucher-body">
          <h3>{voucher.hotel.name}</h3>

          <b className="discount">{discount}% OFF YOUR PURCHASE</b>

          <div className="voucher-promotion">
            <p>
              Use For Room Type: <span className="promo">{roomType}</span>
            </p>
            <p className="expire">Expires: {endDate}</p>
            <p className="expire">Status: {voucher.docStatus}</p>
          </div>
        </div>
        <div className="voucher-get-btn">
          {!view && (
            <Button
              onClick={() => getVoucher(voucher)}
              type="primary"
              icon={<WalletOutlined />}
            >
              Get Voucher
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
