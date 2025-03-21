import React, { useEffect, useState, useContext } from "react";
import { DisplayTasksContext } from "../../contexts/DisplayTasksContextProvider";

import {
  getSortingDropDownContent,
  getEmployeesList,
} from "../../services/api";
const RemoveAppliedSortingFilters = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [prioritys, setPrioritys] = useState([]);
  const { filterTasksObj, setFilterTasksObj } = useContext(DisplayTasksContext);
  const [displayChoosedTasks, SetDisplayChoosedTasks] = useState([]);
  const fetchData = async () => {
    try {
      const empData = await getEmployeesList();
      const prioData = await getSortingDropDownContent("priorities");
      const depData = await getSortingDropDownContent("departments");
      setDepartments(depData);
      setEmployees(empData);
      setPrioritys(prioData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const chosenTasks = [];

    if (filterTasksObj.departmentID !== undefined) {
      const filteredDepartments = departments.filter((department) =>
        filterTasksObj.departmentID.includes(department.id)
      );
      chosenTasks.push(...filteredDepartments);
    }
    if (filterTasksObj.priorityID !== undefined) {
      const filteredPriorities = prioritys.filter((priority) =>
        filterTasksObj.priorityID.includes(priority.id)
      );
      chosenTasks.push(...filteredPriorities);
    }

    if (filterTasksObj.employeeID !== undefined) {
      const filteredEmployees = employees.filter(
        (employee) => employee.id === filterTasksObj.employeeID
      );
      chosenTasks.push(...filteredEmployees);
    }
    SetDisplayChoosedTasks(chosenTasks);
  }, [filterTasksObj, departments, prioritys, employees]);

  const handleClick = (task, index) => {
    const updatedFilterTasksObj = { ...filterTasksObj };

    console.log(updatedFilterTasksObj.priorityID);
    console.log(updatedFilterTasksObj.departmentID);
    if (task.surname) {
      updatedFilterTasksObj.employeeID = undefined;
    } else if (
      departments.some(
        (department) =>
          department.id === task.id && department.name === task.name
      )
    ) {
      updatedFilterTasksObj.departmentID =
        updatedFilterTasksObj.departmentID.filter((id) => id !== task.id);
      if (updatedFilterTasksObj.departmentID.length === 0) {
        updatedFilterTasksObj.departmentID = undefined;
      }
    } else if (
      prioritys.some(
        (priority) => priority.id === task.id && priority.name === task.name
      )
    ) {
      console.log("In IF statment", updatedFilterTasksObj.priorityID);
      updatedFilterTasksObj.priorityID =
        updatedFilterTasksObj.priorityID.filter((id) => id !== task.id);
      if (updatedFilterTasksObj.priorityID.length === 0) {
        console.log("priority lenght is 0", updatedFilterTasksObj.priorityID);
        updatedFilterTasksObj.priorityID = undefined;
      }
    }

    console.log(updatedFilterTasksObj);
    setFilterTasksObj(updatedFilterTasksObj);
    SetDisplayChoosedTasks((prevTasks) =>
      prevTasks.filter((_, i) => i !== index)
    );
  };

  return (
    <ul className="remove-buttons-ul">
      {displayChoosedTasks.map((task, index) => (
        <li key={index}>
          <span>
            {task.surname ? `${task.name} ${task.surname}` : task.name}
          </span>
          <button
            onClick={() => {
              handleClick(task, index);
            }}
          >
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 4L3.5 11"
                stroke="#343A40"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.5 4L10.5 11"
                stroke="#343A40"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RemoveAppliedSortingFilters;
