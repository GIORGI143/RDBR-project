import React, { createContext, useState } from "react";

export const DisplayTasksContext = createContext(null);

export const DisplayTasksContextProvider = ({ children }) => {
  const [filterTasksArray, setFilterTasksArray] = useState([]);
  const [displayCreateEmployeeModal, setDisplayCreateEmployeeModal] =
    useState(false);
  const value = {
    filterTasksArray,
    setFilterTasksArray,
    displayCreateEmployeeModal,
    setDisplayCreateEmployeeModal,
  };

  return (
    <DisplayTasksContext.Provider value={value}>
      {children}
    </DisplayTasksContext.Provider>
  );
};
