import './WatchPage.css'
import type { CommentData } from "../types.ts"; 

type CommentProps = {
  idx: number;
  comment: CommentData;
  toggleLike: (index:number) => void;
};
type Comment = {
  username: string;
  text: string;
  liked: boolean;
};

const Comment: React.FC<CommentProps> = ({ idx, comment, toggleLike }) => {

  const handleLike = (index: number) => {
    toggleLike(index);
  };

  return (
    <div key={idx} className="single-comment">
      <div className="comment-content">
          <p className="comment-username">{comment.username}</p>
          <p className="comment-text">{comment.text}</p>
      </div>
      <p className="comment-like" onClick={() => handleLike(idx)}>
          {comment.liked ? 
              <i className="fas fa-heart active-like"></i> :
              <i className="fas fa-heart"></i>
          }
      </p>
    </div>
  );
};

export default Comment;

