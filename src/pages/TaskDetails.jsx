import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSingleTaskData } from "../services/api";
import ChangeStatus from "../components/taskDetails/ChangeStatus";
import CommentsContainer from "../components/taskDetails/CommentsContainer";
const TaskDetails = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const taskInfo = location.state?.infoForTaskPage;
  const [task, setTask] = useState();
  const [displayDepartament, setDisplayDepartament] = useState();
  const [date, setDate] = useState();
  const convertDepartmentName = (input) => {
    let temp = "";
    const depName = input.department.name.split(" ");
    if (depName.length > 1) {
      depName[0] = depName[0].slice(0, 3);
      depName[1] = depName[1].slice(0, 3);
      temp = `${depName[0]}. ${depName[1]}.`;

      setDisplayDepartament(temp);
    } else {
      setDisplayDepartament(input.department.name);
    }
  };
  const fatchData = async () => {
    try {
      const data = await getSingleTaskData(taskInfo.id);
      setTask(data);
      setLoading(false);
      convertDepartmentName(data);
      formatGeorgianDate(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      throw err;
    }
  };

  function formatGeorgianDate(data) {
    const date = new Date(data.due_date);

    const weekdays = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];
    const weekday = weekdays[date.getDay()];

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    setDate(`${weekday} - ${day}/${month}/${year}`);
  }

  useEffect(() => {
    fatchData();
  }, []);

  if (loading) return <div className="loader">Loading</div>;

  return (
    <>
      <div className="task-details-container">
        <div className="task-detail-page-left-side">
          <div className="priority-dep-container">
            <span
              style={{
                color: taskInfo.priorityColor,
                borderColor: taskInfo.priorityColor,
              }}
            >
              <img src={task.priority.icon} alt="" />
              {task.priority.name}
            </span>
            <span
              style={{
                backgroundColor: taskInfo.deparetmentColor,
              }}
            >
              {displayDepartament}
            </span>
          </div>
          <h2>{task.name}</h2>
          <p>{task.description}</p>

          <h3>დავალების დეტალები</h3>
          <div className="task-small-details">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.2104 15.8901C20.5742 17.3946 19.5792 18.7203 18.3123 19.7514C17.0454 20.7825 15.5452 21.4875 13.9428 21.8049C12.3405 22.1222 10.6848 22.0422 9.12055 21.5719C7.55627 21.1015 6.13103 20.2551 4.96942 19.1067C3.80782 17.9583 2.94522 16.5428 2.45704 14.984C1.96886 13.4252 1.86996 11.7706 2.169 10.1647C2.46804 8.55886 3.1559 7.05071 4.17245 5.77211C5.189 4.49351 6.50329 3.4834 8.0004 2.83008"
                  stroke="#474747"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V12H22Z"
                  stroke="#474747"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              სტატუსი
            </span>
            <div className="statuses-modal-container">
              <ChangeStatus status={task.status.name} ID={task.id} />
            </div>
            <span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z"
                  stroke="#474747"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H7C5.93913 15 4.92172 15.4214 4.17157 16.1716C3.42143 16.9217 3 17.9391 3 19V21"
                  stroke="#474747"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              თანამშრომელი
            </span>
            <div className="employee-task-details">
              <img src={task.employee.avatar} alt={task.employee.name} />
              <div>
                <span>{task.department.name}</span>
                <span>
                  {task.employee.name} {task.employee.surname}
                </span>
              </div>
            </div>
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                  stroke="#474747"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 2V6"
                  stroke="#474747"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 2V6"
                  stroke="#474747"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 10H21"
                  stroke="#474747"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              დავალების ვადა
            </span>
            <span>{date}</span>
          </div>
        </div>

        <CommentsContainer taskID={task.id} />
      </div>
    </>
  );
};

export default TaskDetails;
