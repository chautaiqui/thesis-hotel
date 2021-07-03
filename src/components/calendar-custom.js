import React from "react";

import { DatePicker, Space, notification } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

function getDates(startDate, stopDate) {
  var dateArray = [];
  var currentDate = moment(startDate);
  var stopDatenew = moment(stopDate);
  while (currentDate <= stopDatenew) {
    dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
    currentDate = moment(currentDate).add(1, "days");
  }
  return dateArray;
}

export const CalendarCustom = ({ onSelectDate, bookings }) => {
  const getBookedDates = () => {
    const bookedDates = bookings.reduce((bookedDate, booking) => {
      const startDate = moment(booking.bookingStart).format("YYYY-MM-DD");
      const endDate = moment(booking.bookingEnd).format("YYYY-MM-DD");
      return [...bookedDate, ...getDates(startDate, endDate)];
    }, []);
    return bookedDates;
  };

  const bookedDates = getBookedDates();

  const disableDates = (date) => {
    const day = moment(date).format("YYYY-MM-DD");
    if (bookedDates.includes(day)) {
      return true;
    } else {
      return false;
    }
  };

  const isBookedDate = (date) => {
    const day = moment(date).format("YYYY-MM-DD");
    if (bookedDates.includes(day)) {
      return true;
    } else {
      return false;
    }
  };

  const openNotificationWithIcon = (type, dates) => {
    const bookedDate = dates.join(", ");

    notification[type]({
      message: "Error when booking",
      description: `Ngày ${bookedDate} đã được đặt trước bởi khách hàng khác.`,
    });
  };

  const onSelected = (dates, dateString, info) => {
    const startDate = dates[0];
    const endDate = dates[1];
    const bookingDateArr = getDates(startDate, endDate);
    const bookedDates = bookingDateArr.filter((date) => isBookedDate(date));
    if (bookedDates.length > 0) {
      openNotificationWithIcon("error", bookedDates);
    } else {
      onSelectDate({ startDate, endDate });
    }
  };

  return (
    <>
      <Space direction="vertical" size={12}>
        <RangePicker
          open
          disabledDate={disableDates}
          size="small"
          onCalendarChange={onSelected}
        />
      </Space>
    </>
  );
};
