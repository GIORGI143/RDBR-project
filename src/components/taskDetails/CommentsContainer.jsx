import React from "react";
import WriteComment from "./WriteComment";
import DisplayComments from "./DisplayComments";
const CommentsContainer = ({ taskID }) => {
  return (
    <div className="task-comments">
      <WriteComment parent={null} taskID={taskID} openModal={null} />
      <DisplayComments taskID={taskID} />
    </div>
  );
};

export default CommentsContainer;
