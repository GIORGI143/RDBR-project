import React, { useState } from "react";
import WriteComment from "./WriteComment";
import CommentAnswer from "./CommentAnswer";
const SingleComment = ({ comment, taskID }) => {
  const [writeCommantModalIsOpen, setWriteCommantModalIsOpen] = useState(false);

  return (
    <div className="single-comment">
      <img src={comment.author_avatar} alt="" />
      <div>
        <span>{comment.author_nickname}</span>
        <p>{comment.text}</p>
        <button
          onClick={() => {
            setWriteCommantModalIsOpen(!writeCommantModalIsOpen);
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_11048_1684)">
              <path
                d="M16.0007 13.9993H14.6673V11.9993C14.6673 8.66602 12.0007 5.99935 8.66732 5.99935H5.33398V4.66602H8.66732C12.734 4.66602 16.0007 7.93268 16.0007 11.9993V13.9993Z"
                fill="#8338EC"
              />
              <path
                d="M2 5.33333L5.33333 8.66667V2L2 5.33333Z"
                fill="#8338EC"
              />
            </g>
            <defs>
              <clipPath id="clip0_11048_1684">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          უპასუხე
        </button>

        {writeCommantModalIsOpen && (
          <WriteComment
            parent={comment.id}
            taskID={taskID}
            openModal={setWriteCommantModalIsOpen}
          />
        )}

        {Array.isArray(comment.sub_comments) &&
          comment.sub_comments.map((elm) => {
            return <CommentAnswer answer={elm} key={elm.id} />;
          })}
      </div>
    </div>
  );
};

export default SingleComment;
