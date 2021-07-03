import React from "react";
import { Select } from "antd";
import moment from "moment";
const { Option } = Select;

export const SelectVoucher = ({
  selectedRoom,
  hotelName,
  voucher = [],
  onSelectVoucher,
  expired,
}) => {
  return (
    <>
      <h1>Voucher</h1>

      <Select
        defaultValue="Voucher ..."
        style={{ width: "100%" }}
        onChange={onSelectVoucher}
      >
        <Option value="null">Not choose voucher</Option>
        {voucher.map((item, index) => {
          if (
            hotelName !== item.hotel.name ||
            selectedRoom.roomType.name !== item.roomType.name ||
            moment(new Date()).isAfter(expired)
          ) {
            // eslint-disable-next-line
            return;
          } else {
            return (
              <Option value={index}>
                <ul style={{ listStyleType: "none" }}>
                  <li>{`Hotel: ${item.hotel.name}`}</li>
                  <li>{`Description: ${item.description}`}</li>
                  <li>{`Room Type: ${item.roomType.name}`}</li>
                  <li>{`Discount: ${item.discount}%`}</li>
                  <li>{`Limit: ${item.discountLimit.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}`}</li>
                  <li>{`Start at: ${moment(item.startDate).format(
                    "DD-MM-YYYY"
                  )}`}</li>
                  <li>{`Finish at: ${moment(item.endDate).format(
                    "DD-MM-YYYY"
                  )}`}</li>
                </ul>
              </Option>
            );
          }
        })}
      </Select>
    </>
  );
};
