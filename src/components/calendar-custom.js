import React from 'react';

import {
	Calendar,
	Row,
	Col,
	Select,
	DatePicker,
	Space,
	notification,
} from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

function getDates(startDate, stopDate) {
	var dateArray = [];
	var currentDate = moment(startDate);
	var stopDate = moment(stopDate);
	while (currentDate <= stopDate) {
		dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
		currentDate = moment(currentDate).add(1, 'days');
	}
	return dateArray;
}

export const CalendarCustom = ({ onSelectDate, bookings }) => {
	const getBookedDates = () => {
		const bookedDates = bookings.reduce((bookedDate, booking) => {
			const startDate = moment(booking.bookingStart).format('YYYY-MM-DD');
			const endDate = moment(booking.bookingEnd).format('YYYY-MM-DD');
			return [...bookedDate, ...getDates(startDate, endDate)];
		}, []);
		return bookedDates;
	};

	const bookedDates = getBookedDates();

	const disableDates = (date) => {
		const day = moment(date).format('YYYY-MM-DD');
		if (bookedDates.includes(day)) {
			return true;
		} else {
			return false;
		}
	};

	const isBookedDate = (date) => {
		const day = moment(date).format('YYYY-MM-DD');
		if (bookedDates.includes(day)) {
			return true;
		} else {
			return false;
		}
	};

	const openNotificationWithIcon = (type, dates) => {
		const bookedDate = dates.join(', ');

		notification[type]({
			message: 'Error when booking',
			description: `Ngày ${bookedDate} đã được đặt trước bởi khách hàng khác.`,
		});
	};

	const onSelected = (dates, dateString, info) => {
		const startDate = dates[0];
		const endDate = dates[1];
		const bookingDateArr = getDates(startDate, endDate);
		const bookedDates = bookingDateArr.filter((date) => isBookedDate(date));
		if (bookedDates.length > 0) {
			openNotificationWithIcon('error', bookedDates);
		} else {
			onSelectDate({ startDate, endDate });
		}
	};

	const getListData = (value, attendance) => {
		var listData;
		var d = attendance.find(
			(item) => item.format('DD-MM-YYYY') === value.format('DD-MM-YYYY')
		);
		if (d) {
			listData = [{ type: 'Yes', content: 'isAttendance' }];
		} else {
			listData = [];
		}
		return listData || [];
	};

	const dateCellRender = (value, disableDate) => {
		// const listData = getListData(value, attendance);
		// return (<div className="selected">
		//   <ul className="events">
		//     {listData.map(item => (
		//       <li key={item.content}>
		//         <Badge status={item.type} text={item.content} />
		//       </li>
		//     ))}
		//   </ul>
		//   </div>);
	};

	return (
		<>
			{/* <Calendar
				headerRender={renderHeader}
				disabledDate={disableDates}
				dateCellRender={(v) => {
					return dateCellRender(v, disableDate);
				}}
				fullscreen={false}
				// onSelect={onSelectDate}
				onSelect={getSelectedDate}
			/> */}

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

const renderHeader = ({ value, type, onChange, onTypeChange }) => {
	const start = 0;
	const end = 12;
	const monthOptions = [];

	const current = value.clone();
	const localeData = value.localeData();
	const months = [];
	for (let i = 0; i < 12; i++) {
		current.month(i);
		months.push(localeData.monthsShort(current));
	}

	for (let index = start; index < end; index++) {
		monthOptions.push(
			<Select.Option className="month-item" key={`${index}`}>
				{months[index]}
			</Select.Option>
		);
	}
	const month = value.month();

	const year = value.year();
	const options = [];
	for (let i = year - 10; i < year + 10; i += 1) {
		options.push(
			<Select.Option key={i} value={i} className="year-item">
				{i}
			</Select.Option>
		);
	}

	return (
		<div style={{ padding: 8 }}>
			{/* <Typography.Title level={4}>History</Typography.Title> */}
			<Row gutter={8}>
				<Col>
					<Select
						size="small"
						dropdownMatchSelectWidth={false}
						className="my-year-select"
						onChange={(newYear) => {
							const now = value.clone().year(newYear);
							onChange(now);
						}}
						value={String(year)}
					>
						{options}
					</Select>
				</Col>
				<Col>
					<Select
						size="small"
						dropdownMatchSelectWidth={false}
						value={String(month)}
						onChange={(selectedMonth) => {
							const newValue = value.clone();
							newValue.month(parseInt(selectedMonth, 10));
							onChange(newValue);
						}}
					>
						{monthOptions}
					</Select>
				</Col>
			</Row>
		</div>
	);
};
