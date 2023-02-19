import { useState } from "react";
import "./Styles/AddComment.css";

const AddComment = ({ buttonValue, addComments, replyingTo }) => {
	const replyingToUser = replyingTo ? `@${replyingTo}, ` : '';
	const [comment, setComment] = useState('');

	const clickHandler = () => {
		if (comment === '' || comment === ' ') return;

		const newComment = {
			id: Math.floor(Math.random() * 100) + 5,
			content: replyingToUser + comment,
			score: 0,
			username: 'username',
			currentUser: true,
			replies: [],
		};

		addComments(newComment);
		setComment('');
	};

	return (
		<div className='add-comment'>
			<div className='pic-comment'>
				<div className='profile-pic'></div>
				<textarea
					className='comment-input'
					placeholder='Add a comment'
					value={replyingToUser + comment}
					onChange={(event) => {
					//console.log(replyingTo);
						setComment(
							event.target.value//.replace(replyingTo ? `@${replyingTo}, ` : '', '')
							// `${replyingTo ? `@${replyingTo}, ` : ''} ${event.target.value}`
						);
					}}
				/>
			</div>
			<div className='send-btn-container'>
				<button className='add-btn' onClick={clickHandler}>
					{buttonValue}
				</button>
			</div>
		</div>
	);
};;

export default AddComment;
