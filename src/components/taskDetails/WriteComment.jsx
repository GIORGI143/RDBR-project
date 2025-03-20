import React, { useState, useContext } from "react";
import { postCommant } from "../../services/api";
import { DisplayTasksContext } from "../../contexts/DisplayTasksContextProvider";

const WriteComment = ({ parent, taskID, openModal }) => {
  const [textareaValue, setTextareaValue] = useState("");
  const [inputIsNotValid, setInputIsNotValid] = useState(false);
  const { comments, setComments } = useContext(DisplayTasksContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedStr = textareaValue.trim();
    if (cleanedStr.length === 0) {
      setInputIsNotValid(true);
    } else {
      setInputIsNotValid(false);
      const data = {
        text: cleanedStr,
        parent_id: parent,
      };

      setTextareaValue("");
      if (openModal !== null) openModal(false);

      try {
        const uploadedComment = await postCommant(data, taskID);
        //UI updates when new comment gets added
        if (parent === null) {
          setComments((prevComments) => [uploadedComment, ...prevComments]);
        } else {
          comments.forEach((element) => {
            if (element.sub_comments === undefined) {
              element.sub_comments = [];
            }
            if (element.id === parent) {
              element.sub_comments.push(uploadedComment);
              setComments([...comments]);
            }
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <form action="?" method="post" onSubmit={handleSubmit}>
      <textarea
        name="comment"
        id="comment"
        placeholder="დაწერე კომენტარი"
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
      ></textarea>
      <button>დააკომენტარე</button>
      {inputIsNotValid && <span>ველი ცარიელია</span>}
    </form>
  );
};

export default WriteComment;
