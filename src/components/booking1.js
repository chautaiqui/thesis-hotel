import React, { useState, useContext } from "react";
import { User } from "../pkg/reducer";
import { RoomItem } from "./room-item";
import {
  Row,
  Col,
  Calendar,
  Select,
  Typography,
  notification,
  Modal,
  Button,
} from "antd";
import { CalendarCustom } from "./calendar-custom";
import { Facilities } from "./facilities";
import { SelectVoucher } from "./select-voucher";
import { BookingInfo } from "./booking-info";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const openNotificationWithIcon = (type, description) => {
  notification[type]({
    message: "Error when booking",
    description: `${description}`,
  });
};

export const Booking = ({ hotel, room }) => {
  console.log(hotel, room);
  const [selected, setSelected] = useState({}); //room
  const [booking, setBooking] = useState({});
  const [selectedVoucher, setSelectedVoucher] = useState({});
  const [selectedDate, setSelectedDate] = useState({});
  const [user] = useContext(User.context);
  const [roomPrice, setRoomPrice] = useState(0);
  //Modal show price
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    if (
      selected.roomType.name !== selectedVoucher.roomType.name ||
      moment(selectedVoucher.endDate).isBefore(moment(selectedDate.startDate))
    )
      setIsModalVisible(false);
    else setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //end modal show price

  const selectRoom = (item) => {
    setSelected(item);
    setBooking(item);
  };
  const onSelectDate = (date) => {
    setSelectedDate(date);
  };

  const onSelectVoucher = (index) => {
    setSelectedVoucher(user.voucher[index]);
    console.log({ selectedVoucher });
  };

  const payment = () => {
    const bookingStartDate = moment(selectedDate.startDate);
    const bookingEndDate = moment(selectedDate.endDate);
    const duration = moment
      .duration(bookingStartDate.diff(bookingEndDate))
      .asDays();

    let price = (Math.abs(duration) + 1) * selected.roomType.price;
    if (selectedVoucher) {
      if (selected.roomType.name !== selectedVoucher.roomType.name) {
        openNotificationWithIcon("error", "Not found voucher on this room");
        return;
      }
      if (moment(selectedVoucher.endDate).isBefore(bookingStartDate)) {
        openNotificationWithIcon("error", "Voucher is expired");
        return;
      }

      price * (selectedVoucher.discount / 100) < selectedVoucher.discountLimit
        ? setRoomPrice(price - (price * selectedVoucher.discount) / 100)
        : setRoomPrice(price - selectedVoucher.discountLimit);
    } else {
      setRoomPrice(price);
    }
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Row gutter={[16, 16]}>
            {room &&
              room.map((item, index) => {
                return (
                  <Col
                    key={index}
                    span={12}
                    onClick={() => {
                      selectRoom(item);
                    }}
                  >
                    <RoomItem
                      room={item}
                      selected={item._id === selected._id}
                    />
                  </Col>
                );
              })}
          </Row>
        </Col>
        <Col xs={24} sm={16}>
          {selected._id && (
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={15}>
                <CalendarCustom
                  onSelectDate={onSelectDate}
                  bookings={selected.bookings}
                />
              </Col>
              <Col xs={24} sm={9}>
                <Facilities data={selected.facilities} />
                {user._id && (
                  <SelectVoucher
                    voucher={user.voucher}
                    onSelectVoucher={onSelectVoucher}
                  />
                )}
                <BookingInfo />
                <Button
                  type="primary"
                  onClick={() => {
                    showModal();
                    payment();
                  }}
                >
                  Booking
                </Button>
                <Modal
                  title="Basic Modal"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  {roomPrice.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}{" "}
                </Modal>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};
