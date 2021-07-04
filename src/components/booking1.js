import React, { useState, useContext, useEffect } from "react";
import { User } from "../pkg/reducer";
import { RoomItem } from "./room-item";
import { Row, Col, notification, Modal, Button, message } from "antd";
import { CalendarCustom } from "./calendar-custom";
import { Facilities } from "./facilities";
import { SelectVoucher } from "./select-voucher";
import { BookingInfo } from "./booking-info";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { postMethod } from "../pkg/api";

const moment = extendMoment(Moment);

const openNotificationWithIcon = (type, description) => {
  notification[type]({
    message: "Error when booking",
    description: `${description}`,
  });
};

export const Booking = ({ hotel, room }) => {
  const [selected, setSelected] = useState({}); //room
  const [selectedVoucher, setSelectedVoucher] = useState();
  const [selectedDate, setSelectedDate] = useState({});
  const [user] = useContext(User.context);
  const [roomPrice, setRoomPrice] = useState(0);

  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  //Modal show price
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    if (selectedVoucher) {
      if (
        selected.roomType.name !== selectedVoucher.roomType.name ||
        moment(selectedVoucher.endDate).isBefore(moment(selectedDate.startDate))
      )
        setIsModalVisible(false);
      else setIsModalVisible(true);
    } else setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //end modal show price

  const selectRoom = (item) => {
    setSelected(item);
  };
  const onSelectDate = (date) => {
    setSelectedDate(date);
  };

  const onSelectVoucher = (index) => {
    setSelectedVoucher(user.voucher[index]);
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

  const submit = () => {
    if (selectedVoucher) {
      const data = {
        room: selected._id,
        customer: user._id,
        bookingStart: moment(selectedDate.startDate).format(["DD-MM-YYYY"]),
        bookingEnd: moment(selectedDate.endDate).format(["DD-MM-YYYY"]),
        voucher: selectedVoucher._id,
        totalMoney: roomPrice,
      };
      const createBooking = async () => {
        const res = await postMethod("/booking/create", data);
        if (res.success) {
          message.success("Booking sucessful!");
        } else {
          message.error(res.error);
          return;
        }
      };
      createBooking();
    } else {
      const data = {
        room: selected._id,
        customer: user._id,
        bookingStart: moment(selectedDate.startDate).format(["DD-MM-YYYY"]),
        bookingEnd: moment(selectedDate.endDate).format(["DD-MM-YYYY"]),
        totalMoney: roomPrice,
      };
      const createBooking = async () => {
        const res = await postMethod("/booking/create", data);
        if (res.success) {
          message.success("Booking sucessfull!");
        } else {
          message.error(res.error);
          return;
        }
      };
      createBooking();
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
                    hotelName={hotel.name}
                    voucher={user.voucher}
                    onSelectVoucher={onSelectVoucher}
                    selectedRoom={selected}
                  />
                )}
                <BookingInfo />
                <Button
                  type="primary"
                  onClick={() => {
                    payment();
                    showModal();
                  }}
                  style={{ marginTop: "20px" }}
                >
                  Show price
                </Button>
                <Modal
                  title="Basic Modal"
                  visible={isModalVisible}
                  onOk={submit}
                  onCancel={handleCancel}
                >
                  Price for this room:{" "}
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
