import React, { createContext, useState } from "react";

export const CreateNewTaskContext = createContext(null);

const CreateNewTaskContextProvider = ({ children }) => {
  const [choosedPriorityId, setChoosedPriorityId] = useState(undefined);
  const [choosedStatusId, setChoosedStatusId] = useState(undefined);
  const [choosedDepartmentId, setChoosedDepartmentId] = useState(undefined);
  const [choosedEmployeeId, setChoosedEmployeeId] = useState(undefined);

  const value = {
    choosedPriorityId,
    setChoosedPriorityId,
    choosedStatusId,
    setChoosedStatusId,
    choosedDepartmentId,
    setChoosedDepartmentId,
    choosedEmployeeId,
    setChoosedEmployeeId,
  };

  return (
    <CreateNewTaskContext.Provider value={value}>
      {children}
    </CreateNewTaskContext.Provider>
  );
};

export default CreateNewTaskContextProvider;
