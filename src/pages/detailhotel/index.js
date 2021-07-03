import React, { useState, useEffect } from 'react';
import { getRequest } from '../../pkg/api';

import { useLocation, useParams } from 'react-router-dom';
import { message } from 'antd';
import { ImgCarousel } from '../../components/carousel';
import { HotelHeader } from '../../components/hotel-header';
import { Booking } from '../../components/booking1';
import { HotelRating } from '../../components/HotelRating/hotel-rating';
import './detailhotel.style.css';

export const DetailHotel = (props) => {
	const { id } = useParams();
	const [hotel, setHotel] = useState({});
	const [room, setRoom] = useState([]);

	useEffect(() => {
		const fetchPost = async () => {
			const re = await getRequest('hotel', {}, [id]);
			console.log(re);
			if (!re.success) {
				message.error(re.message);
			} else {
				if (re.result.length === 0) return;
				setHotel(re.result);
			}
		};
		if (!hotel._id) {
			fetchPost();
		}
	}, [id]);

	useEffect(() => {
		const fetchRoom = async () => {
			const re = await getRequest(`hotel/${hotel._id}/room`);
			console.log(re);
			if (!re.success) {
				message.error(re.message);
			} else {
				if (re.result.length === 0) return;
				setRoom(re.result.rooms);
			}
		};
		if (hotel._id && room.length === 0) {
			// fetch room
			fetchRoom();
		}
	}, [hotel]);
	console.log(hotel);
	return (
		<>
			{id ? (
				<div>
					<HotelHeader hotel={hotel} />
					<div style={{ marginTop: 20 }}>
						{/* <h1 style={{ fontWeight: "bolder" }}>{hotel.name}</h1> */}
						<div className="detail-decr">
							<p>
								<img
									src="https://res.cloudinary.com/fpt-telecom/image/upload/v1621972432/ife6wabz6l5jrzqoagby.png"
									alt="lct"
									style={{ height: '24px' }}
								/>
								{`${hotel.street}, ${hotel.ward}, ${hotel.district}, ${hotel.province}`}
							</p>
							<iframe
								loading="lazy"
								allowfullscreen
								style={{ height: '300px', width: '100%', border: 'none' }}
								src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDw1VghHA44aPt_JcYB7ac29AKDJja1OgM&q=${hotel.street},${hotel.ward}+${hotel.district}+${hotel.province}`}
							></iframe>
						</div>
						<div>
							<h3
								style={{
									fontWeight: 'bolder',
									textAlign: 'start',
									marginTop: 10,
								}}
							>
								Facilities
							</h3>
						</div>
					</div>
					<Booking hotel={hotel} room={room} />
					<HotelRating />
				</div>
			) : (
				<h1>Page not found</h1>
			)}
		</>
	);
};
