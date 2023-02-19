import { useState, useEffect } from "react";

import "./Styles/Comment.css";

import AddComment from "./AddComment";
import DeleteModal from "./DeleteModal";
import CommentVotes from "./CommentVotes";
import CommentHeader from "./CommentHeader";


const Reply = ({
  commentData,
  type,
  updateScore,
  addNewReply,
  editComment,
  deleteComment,
  setDeleteModalState,
}) => {
  const [replying, setReplying] = useState(false);
  const [vote, setVoted] = useState(false);
  const [score, setScore] = useState(commentData.score);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.content);
  const [deleting, setDeleting] = useState(false);


  useEffect(() => {
    localStorage.setItem("voteState", vote);
  }, [vote]);

  // adding reply
  const addReply = (newReply) => {
    addNewReply(newReply);
    setReplying(false);
  };

  const commentContent = () => {
    const text = commentData.content.trim().split(" ");
    const firstWord = text.shift().split(",");

    return !editing ? (
      <div className="comment-content">
        <span className="replyingTo">{firstWord}</span>
        {text.join(" ")}
      </div>
    ) : (
      <textarea
        className="content-edit-box"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
    );
  };

  const updateComment = () => {
    editComment(content, commentData.id, "reply");
    setEditing(false);
  };

  // delete comment
  const deleteReply = () => {
    deleteComment(commentData.id, "reply");
    setDeleting(false);
  };

  return (
			<div
				className={`comment-container ${
					commentData.replies[0] !== undefined ? 'gap' : ''
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

						{commentContent()}
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
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
								type={'reply'}
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
					<div className='reply-comment'>
						<AddComment
							buttonValue={'reply'}
							addComments={addReply}
							replyingTo={commentData.username}
						/>
					</div>
				)}
				{commentData.replies.map((reply) => (
					<Reply
						key={reply.id}
						commentData={reply}
						updateScore={updateScore}
						addReply={addReply}
					/>
				))}

				{deleting && (
					<DeleteModal
						setDeleting={setDeleting}
						deleteComment={deleteReply}
						setDeleteModalState={setDeleteModalState}
					/>
				)}
			</div>
		);
};

export default Reply;
