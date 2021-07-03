import React, { useState } from 'react';
import { Rate, Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
	<List
		dataSource={comments}
		header={`${comments.length} ${
			comments.length > 1 ? 'comment' : 'comments'
		}`}
		itemLayout="horizontal"
		renderItem={(props) => (
			<>
				<List.Item>
					<Comment {...props} actions={[<Rate defaultValue={3} />]} />
				</List.Item>
			</>
		)}
	/>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => {
	console.log({ value });

	return (
		<>
			<Form.Item>
				<TextArea rows={4} onChange={onChange} value={value} />
			</Form.Item>
			<Form.Item>
				<Rate defaultValue={5} />
			</Form.Item>
			<Form.Item>
				<Button
					htmlType="submit"
					loading={submitting}
					onClick={onSubmit}
					type="primary"
				>
					Add Comment
				</Button>
			</Form.Item>
		</>
	);
};

export const HotelRating = () => {
	const [comments, setComments] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [value, setValue] = useState('');

	const handleSubmit = () => {
		if (!value) return;

		setSubmitting(true);

		setTimeout(() => {
			setComments([
				...comments,
				{
					author: 'Han Solo',
					avatar:
						'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
					content: <p>{value}</p>,
					datetime: moment().fromNow(),
				},
			]);
			setValue('');
			setSubmitting(false);
		}, 1000);
	};

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<>
			<Comment
				avatar={
					<Avatar
						src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
						alt="Han Solo"
					/>
				}
				content={
					<Editor
						onChange={handleChange}
						onSubmit={handleSubmit}
						submitting={submitting}
						value={value}
					/>
				}
				style={{ marginTop: '50px' }}
			/>
			{comments.length > 0 && <CommentList comments={comments} />}
		</>
	);
};
