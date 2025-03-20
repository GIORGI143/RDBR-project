import React, { useEffect, useState, useContext } from "react";
import { getComments } from "../../services/api";
import SingleComment from "./SingleComment";
import { DisplayTasksContext } from "../../contexts/DisplayTasksContextProvider";
const DisplayComments = ({ taskID }) => {
  const { comments, setComments } = useContext(DisplayTasksContext);
  const fetchComments = async () => {
    try {
      const data = await getComments(taskID);
      setComments(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <>
      <p>
        კომენტარები <span>{comments.length}</span>
      </p>
      <div className="comments">
        {comments.map((elm) => {
          return <SingleComment taskID={taskID} comment={elm} key={elm.id} />;
        })}
      </div>
    </>
  );
};

export default DisplayComments;
