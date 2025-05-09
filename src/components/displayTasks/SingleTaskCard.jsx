import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTaskComments } from "../../services/api";

const SingleTaskCard = ({ task, borderColor, deparetmentColor }) => {
  const [dueDate, setDueData] = useState();
  const [displayDepartament, setDisplayDepartament] = useState();
  const [commentAmount, setCommentAmount] = useState();
  const [shortenDescription, setShortenDescription] = useState("");
  const colorForPriority = ["#08A508", "#FFBE0B", "#FA4D4D"];
  const infoForTaskPage = {
    priorityColor: colorForPriority[task.priority.id - 1],
    deparetmentColor,
    id: task.id,
  };
  const months = [
    "იანვ",
    "თებ",
    "მარ",
    "აპრ",
    "მაი",
    "ივნ",
    "ივლ",
    "აგვ",
    "სექ",
    "ოქტ",
    "ნოემ",
    "დეკ",
  ];

  const fatchComments = async () => {
    try {
      const data = await getTaskComments(task.id);
      setCommentAmount(data.length);
    } catch (err) {
      console.error("Error fetching products:", err);
      throw err;
    }
  };

  const convertDepartmentName = () => {
    let temp = "";
    const depName = task.department.name.split(" ");
    if (depName.length > 1) {
      depName[0] = depName[0].slice(0, 3);
      depName[1] = depName[1].slice(0, 3);
      temp = `${depName[0]}. ${depName[1]}.`;

      setDisplayDepartament(temp);
    } else {
      setDisplayDepartament(task.department.name);
    }
  };
  const convertDate = () => {
    const date = task.due_date.split("-");
    date[2] = date[2].split("T");
    date[2] = date[2][0];
    date[1] = months[Number(date[1]) - 1];
    const convertedDate = `${date[2]} ${date[1]}, ${date[0]}`;
    setDueData(convertedDate);

    const shortened =
      task.description.length > 100
        ? task.description.slice(0, 100) + "..."
        : task.description;
    setShortenDescription(shortened);
  };
  useEffect(() => {
    convertDepartmentName();
    convertDate();
    fatchComments();
  }, []);

  return (
    <Link
      to={`/task-details/${task.id}`}
      style={{
        borderColor: borderColor,
      }}
      state={{ infoForTaskPage }}
      className="single-task-card"
    >
      <div>
        <div>
          <div>
            <span
              style={{
                color: colorForPriority[task.priority.id - 1],
                borderColor: colorForPriority[task.priority.id - 1],
              }}
            >
              <img src={task.priority.icon} alt="" />
              {task.priority.name}
            </span>
            <span
              style={{
                backgroundColor: deparetmentColor,
              }}
            >
              {displayDepartament}
            </span>
          </div>
          <span>{dueDate}</span>
        </div>
        <div>
          <h3>{task.name}</h3>
          <p>{shortenDescription}</p>
        </div>
      </div>
      <div className="card-image-comments">
        <img src={task.employee.avatar} alt={task.employee.name} />
        <div>
          <svg
            width="22"
            height="19"
            viewBox="0 0 22 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.08086 0.259766C1.87258 0.259766 0.880859 1.25148 0.880859 2.45977V13.0198C0.880859 14.228 1.87258 15.2198 3.08086 15.2198H4.88211C4.94227 15.7491 4.93539 16.239 4.79961 16.6498C4.63289 17.1551 4.3218 17.5796 3.74086 17.9285C3.57758 18.0316 3.50195 18.2293 3.5518 18.4149C3.60164 18.6005 3.76836 18.7329 3.96086 18.7398C5.82742 18.7398 7.96727 17.7652 9.04836 15.2198H18.9209C20.1291 15.2198 21.1209 14.228 21.1209 13.0198V2.45977C21.1209 1.25148 20.1291 0.259766 18.9209 0.259766H3.08086ZM3.08086 1.13977H18.9209C19.6496 1.13977 20.2409 1.73102 20.2409 2.45977V13.0198C20.2409 13.7485 19.6496 14.3398 18.9209 14.3398H8.80086C8.61695 14.3398 8.45195 14.4549 8.38836 14.6285C7.7043 16.4951 6.48227 17.3837 5.21211 17.7085C5.38398 17.4627 5.54727 17.2032 5.63836 16.9248C5.86695 16.2304 5.84805 15.4707 5.70711 14.6973C5.66758 14.4927 5.49055 14.3432 5.28086 14.3398H3.08086C2.35211 14.3398 1.76086 13.7485 1.76086 13.0198V2.45977C1.76086 1.73102 2.35211 1.13977 3.08086 1.13977Z"
              fill="#212529"
            />
          </svg>
          <span>{commentAmount}</span>
        </div>
      </div>
    </Link>
  );
};

export default SingleTaskCard;
