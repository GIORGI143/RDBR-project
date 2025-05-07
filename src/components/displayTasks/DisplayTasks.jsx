import React, { useEffect, useState, useContext } from "react";
import {
  getData,
  getTasks,
  getSortingDropDownContent,
} from "../../services/api";
import SingleTaskCard from "./SingleTaskCard";
import { DisplayTasksContext } from "../../contexts/DisplayTasksContextProvider";
const DisplayTasks = () => {
  const [unfilteredArr, setUnfilteredArr] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const { filterTasksObj, depColors, setDepColors, setFilterTasksObj } =
    useContext(DisplayTasksContext);
  /*{
    departmentID: undefined,
    priorityID: undefined,
    employeeID: undefined,
  } */
  const statusColors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"];

  const fatchStatuses = async () => {
    try {
      const data = await getData("statuses");
      const taskdata = await getTasks();
      if (Object.keys(depColors).length === 0) {
        const departments = await getSortingDropDownContent("departments");
        departments.forEach((element) => {
          const randomColor =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
          depColors[element.id] = randomColor;
        });
      }
      setUnfilteredArr(taskdata);
      setStatuses(data);
      setLoading(false);
      setTasks(taskdata);
      setDepColors((prev) => {
        return prev;
      });
    } catch (err) {
      console.error("Error fetching products:", err);
      throw err;
    }
  };

  useEffect(() => {
    const temp = unfilteredArr.filter((singleTask) => {
      let priorityIsValid = false;
      let departmentIsValid = false;
      let employeeIsValid = false;

      if (
        !filterTasksObj.priorityID ||
        !Array.isArray(filterTasksObj.priorityID)
      ) {
        priorityIsValid = true;
      } else {
        priorityIsValid = filterTasksObj.priorityID.includes(
          singleTask.priority.id
        );
      }

      if (
        !filterTasksObj.departmentID ||
        !Array.isArray(filterTasksObj.departmentID)
      ) {
        departmentIsValid = true;
      } else {
        departmentIsValid = filterTasksObj.departmentID.includes(
          singleTask.department.id
        );
      }

      if (filterTasksObj.employeeID === undefined) {
        employeeIsValid = true;
      } else {
        employeeIsValid = filterTasksObj.employeeID === singleTask.employee.id;
      }

      return departmentIsValid && priorityIsValid && employeeIsValid;
    });

    setTasks(temp);
  }, [filterTasksObj]);

  useEffect(() => {
    fatchStatuses();
    setFilterTasksObj({
      departmentID: undefined,
      priorityID: undefined,
      employeeID: undefined,
    });
  }, []);

  if (loading) {
    return <div className="loader">Loading</div>;
  }
  return (
    <div className="display-tasks-container">
      {statuses.map((elm, index) => {
        return (
          <div className="status-column" key={elm.id}>
            <div
              style={{
                backgroundColor: statusColors[index],
              }}
            >
              {elm.name}
            </div>
            {tasks.map((singleTask) => {
              if (singleTask.status.id === elm.id) {
                return (
                  <SingleTaskCard
                    deparetmentColor={depColors[`${singleTask.department.id}`]}
                    key={singleTask.id}
                    task={singleTask}
                    borderColor={statusColors[index]}
                  />
                );
              } else {
                return;
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayTasks;
