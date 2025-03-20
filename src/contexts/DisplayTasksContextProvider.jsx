import React, { createContext, useState } from "react";
export const DisplayTasksContext = createContext(null);

export const DisplayTasksContextProvider = ({ children }) => {
  const [filterTasksObj, setFilterTasksObj] = useState({
    departmentID: undefined,
    priorityID: undefined,
    employeeID: undefined,
  });
  const [comments, setComments] = useState([]);

  const [depColors, setDepColors] = useState({});
  const [displayCreateEmployeeModal, setDisplayCreateEmployeeModal] =
    useState(false);

  const value = {
    depColors,
    setDepColors,
    filterTasksObj,
    setFilterTasksObj,
    displayCreateEmployeeModal,
    setDisplayCreateEmployeeModal,
    comments,
    setComments,
  };

  return (
    <DisplayTasksContext.Provider value={value}>
      {children}
    </DisplayTasksContext.Provider>
  );
};
