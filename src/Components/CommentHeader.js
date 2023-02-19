import CommentBtn from "./CommentBtn";
import image from '../Assets/avatars/PngItem_786293.png'

const CommentHeader = ({commentData, setReplying, setDeleting, setDeleteModalState, setEditing, time}) => {
  return (
    <div className="comment--header">
      <div className='profile-pic'><img src={image} alt="dp" /></div>
      <div className="username">{commentData.username}</div>
      <CommentBtn
        commentData={commentData}
        setReplying={setReplying}
        setDeleting={setDeleting}
        setDeleteModalState={setDeleteModalState}
        setEditing={setEditing}
      />
    </div>
  );
};

export default CommentHeader;
