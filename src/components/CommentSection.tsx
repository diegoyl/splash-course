import React, { useState, useEffect, useRef } from "react";
import Comment from "./Comment.tsx";
import type { CommentData } from "../types.ts"; 

type CommentSectionProps = {
  video_id: string;
  myUsername: string;
};

const CommentSection: React.FC<CommentSectionProps> = ({ video_id, myUsername }) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState("");
  const commentsEndRef = useRef<HTMLDivElement | null>(null);

  // When opening video page, fetch all existing comments to populate comment section
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id=${video_id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch comments: ${response.status}`);
        }

        const data = await response.json();

        // map raw comment data onto comment objects that can be used in comment section
        const loadedComments: CommentData[] = data.comments.map((item: any) => ({
          username: item.user_id || "Anonymous",
          text: item.content,
          liked: false,
        }));
        setComments(loadedComments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [video_id]);

  const scrollToBottom = () => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddComment = async () => {

    // this comment object is shown locally, 
    // but a separate object is added to the backend that also includes video_id
    const tempComment: CommentData = {
      username: myUsername,
      text: newComment,
      liked: false,
    };

    setComments(prev => [...prev, tempComment]); // adding to comment section
    setNewComment(""); /// resseting new comment box text
    setTimeout(scrollToBottom, 10); // comment is added to bottom so need to scroll to see it

    // POSTing new comment to API
    try {
      const payload = {
        "video_id": video_id,
        "content": newComment,
        "user_id": myUsername,
      };

      const response = await fetch("https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(payload),
      });

      if (!response.ok) {throw new Error(`Oh noooo, failed to post comment: ${response.status}`);}

    } catch (error) {console.error(error);}
  };

  const toggleLike = (index: number) => {
    const updatedComments = [...comments];
    updatedComments[index].liked = !updatedComments[index].liked;
    setComments(updatedComments);
  };

  return (
    <>
      <div className="existing-comments">
        {comments.map((comment, idx) => (
          <Comment key={idx} idx={idx}
            comment={comment}
            toggleLike={toggleLike}
          />
        ))}
        {/* for scrolling to bottom */}
        <div ref={commentsEndRef} /> 
      </div>

      <div className="new-comment-container">
        <input
          type="text" className="comment-text" placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Send</button>
      </div>
    </>
  );
};

export default CommentSection;
