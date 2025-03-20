import React from "react";

const CommentAnswer = ({ answer }) => {
  return (
    <div className="comment-answer">
      <img src={answer.author_avatar} alt="" />
      <div>
        <span>{answer.author_nickname}</span>
        <p>{answer.text}</p>
      </div>
    </div>
  );
};

export default CommentAnswer;
