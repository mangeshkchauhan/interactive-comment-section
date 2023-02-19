import { useEffect, useState } from 'react';

import './Styles/Comment.css';

import AddComment from './AddComment';
import ReplyContainer from './ReplyContainer';
import DeleteModal from './DeleteModal';
import CommentVotes from './CommentVotes';
import CommentHeader from './CommentHeader';

const Comment = ({
	commentData,
	updateScore,
	updateReplies,
	editComment,
	commentDelete,
	setDeleteModalState,
}) => {
	const [replying, setReplying] = useState(false);
	const [vote, setVoted] = useState(false);
	const [score, setScore] = useState(commentData.score);
	const [editing, setEditing] = useState(false);
	const [content, setContent] = useState(commentData.content);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		localStorage.setItem('voteState', vote);
	}, [vote]);

	const addReply = (newReply) => {
		const replies = [...commentData.replies, newReply];
		updateReplies(replies, commentData.id);
		setReplying(false);
	};

	const updateComment = () => {
		editComment(content, commentData.id, 'comment');
		setEditing(false);
	};

	const deleteComment = (id, type) => {
		const finalType = type !== undefined ? type : 'comment';
		const finalId = id !== undefined ? id : commentData.id;
		commentDelete(finalId, finalType, commentData.id);
		setDeleting(false);
	};

	return (
		<div
			className={`comment-container ${
				commentData.replies[0] !== undefined ? 'reply-container-gap' : ''
			}`}
		>
			<div className='comment'>
				<div className='comment--body'>
					<CommentHeader
						commentData={commentData}
						setReplying={setReplying}
						setDeleting={setDeleting}
						setDeleteModalState={setDeleteModalState}
						setEditing={setEditing}
					/>
					{!editing ? (
						<div className='comment-content'>{commentData.content}</div>
					) : (
						<textarea
							className='content-edit-box'
							value={content}
							onChange={(e) => {
								setContent(e.target.value);
							}}
						/>
					)}
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						position: 'relative',
					}}
				>
					{!editing && (
						<CommentVotes
							vote={vote}
							setVoted={setVoted}
							score={score}
							setScore={setScore}
							updateScore={updateScore}
							commentData={commentData}
							type={'comments'}
						/>
					)}
					{editing && (
						<button className='update-btn' onClick={updateComment}>
							update
						</button>
					)}
				</div>
			</div>

			{replying && (
				<AddComment
					buttonValue={'reply'}
					addComments={addReply}
					replyingTo={commentData.username}
				/>
			)}
			{commentData.replies !== [] && (
				<ReplyContainer
					type={'reply'}
					key={commentData.replies.id}
					commentData={commentData.replies}
					updateScore={updateScore}
					addReply={addReply}
					editComment={editComment}
					deleteComment={deleteComment}
					setDeleteModalState={setDeleteModalState}
				/>
			)}

			{deleting && (
				<DeleteModal
					setDeleting={setDeleting}
					deleteComment={deleteComment}
					setDeleteModalState={setDeleteModalState}
				/>
			)}
		</div>
	);
};

export default Comment;
