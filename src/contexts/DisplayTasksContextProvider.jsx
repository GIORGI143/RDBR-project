import React, { createContext, useState } from "react";

export const DisplayTasksContext = createContext(null);

export const DisplayTasksContextProvider = ({ children }) => {
  const [filterTasksArray, setFilterTasksArray] = useState([]);

  const value = { filterTasksArray, setFilterTasksArray };

  return (
    <DisplayTasksContext.Provider value={value}>
      {children}
    </DisplayTasksContext.Provider>
  );
};
