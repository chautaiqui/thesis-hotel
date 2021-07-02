import React, { useState, useContext } from 'react';
import { User } from '../pkg/reducer';
import { RoomItem } from './room-item';
import { Row, Col, Calendar, Select, Typography, notification } from 'antd';
import { CalendarCustom } from './calendar-custom';
import { Facilities } from './facilities';
import { SelectVoucher } from './select-voucher';
import { BookingInfo } from './booking-info';
import moment from 'moment';

const openNotificationWithIcon = (type, description) => {
	const bookedDate = dates.join(', ');

	notification[type]({
		message: 'Error when booking',
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

	const selectRoom = (item) => {
		setSelected(item);
		setBooking(item);
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
		const duration = moment().range(bookingStartDate, bookingEndDate);
		let price = duration * selected.roomType.price;
		if (selectedVoucher) {
			if (selectedVoucher.roomType.name !== selected.roomType.name) {
			}
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
							</Col>
						</Row>
					)}
				</Col>
			</Row>
		</>
	);
};
