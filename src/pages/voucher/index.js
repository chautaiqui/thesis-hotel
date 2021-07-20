import moment from 'moment';
import React, { useState, useEffect, useContext } from 'react';
import { User } from '../../pkg/reducer';
import { getRequest, postMethod } from '../../pkg/api';
import { messageError, messageSuccess } from '../../commons';
import { VoucherItem } from '../../components/voucher-item';
import { Row, Col } from 'antd';

import './voucher.style.css';
import { CustomEmpty, CustomEmptyData } from '../../commons/components/empty';

const initState = {
	behavior: 'init',
	data: [],
};
export const Voucher = () => {
	const [state, setState] = useState(initState);
	const [user, dispatch] = useContext(User.context);
	const getData = async () => {
		const res = await getRequest('voucher/available');
		if (res.success) {
			setState({
				behavior: 'stall',
				data: res.result.vouchers,
			});
		}
	};
	useEffect(() => {
		switch (state.behavior) {
			case 'init':
				getData();
				return;
			case 'stall':
				return;
			default:
				break;
		}
	}, [state]);
	const getVoucher = (voucher) => {
		if (user._id) {
			// get voucher
			const get = async () => {
				const res = await postMethod(`voucher/${voucher._id}/get`, {
					customer: user._id,
				});
				if (res.success) {
					messageSuccess(
						'Success',
						'Get voucher successfully! Please check voucher in account information.'
					);
					const new_voucher = res.result;
					console.log({
						...user, voucher: [...user.voucher, new_voucher]
					})
					console.log('----', new_voucher)
					dispatch({
						type: 'UPDATE', user: {
							...user, voucher: [...user.voucher, new_voucher]
						}
					})
					
				} else {
					messageError('Get voucher error', res.error);
				}
			};
			get();
		} else {
			// must login
			messageError(
				'Error to get voucher',
				'You must login to use this function'
			);
		}
	};
	return <>
		{
			state.behavior === 'init' && <CustomEmpty title={"Loading"}/>
		}
		{
			(state.behavior === 'stall' && state.data.length === 0) && <CustomEmptyData title="No voucher" content="No voucher available in this time"/>
		}
		{
			(state.behavior === 'stall' && state.data.length !== 0) && <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
				{state.data.map((item, index) => {
					return (
						<Col key={index} xs={24} sm={12}>
							<VoucherItem
								getVoucher={getVoucher}
								voucher={item}
							/>
						</Col>
					);
				})}
			</Row>
		}
	</>
};

export const VoucherList = (props) => {
	const { data = [] } = props;
	const list = data.splice(0, 2).map((item, index) => (
		<Col xs={24} sm={12} key={index}>
			<a href="/voucher">
				<img
					style={{
						width: '100%',
						height: '200px',
						borderRadius: '10px',
					}}
					src={item.img}
					alt="hinh voucher"
					key={index}
				/>
			</a>
		</Col>
	));
	return <Row gutter={[16, 16]}>{list}</Row>;
};
