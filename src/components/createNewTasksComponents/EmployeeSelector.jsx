import React, { useState, useEffect, useContext } from "react";
import { getEmployeesList } from "../../services/api";
import { DisplayTasksContext } from "../../contexts/DisplayTasksContextProvider";
import { CreateNewTaskContext } from "../../contexts/CreateNewTaskContext";

const EmployeeSelector = () => {
  const { setDisplayCreateEmployeeModal } = useContext(DisplayTasksContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [employee, setEmloyee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { choosedDepartmentId, setChoosedEmployeeId } =
    useContext(CreateNewTaskContext);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const fetchData = async () => {
    try {
      const response = await getEmployeesList();
      setEmloyee(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
  const handleFilterEmployees = async () => {
    setIsLoading(true);
    try {
      await fetchData();
      if (choosedDepartmentId !== null) {
        const tempArr = employee.filter((elm) => {
          if (elm.department.id === choosedDepartmentId) {
            return true;
          } else {
            return false;
          }
          setIsLoading(false);
        });
        setFilteredEmployees(tempArr);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
  useEffect(() => {
    handleFilterEmployees();
    setSelectedEmployee(null);
  }, [choosedDepartmentId]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <span
        className="employee-tital"
        style={{
          color: choosedDepartmentId !== null && "#343A40",
        }}
      >
        პასუხისმგებელი თანამშრომელი*
      </span>
      <div>
        <div
          className="employee-selecton"
          style={{
            justifyContent: selectedEmployee !== null && "space-between",
          }}
          onClick={() => {
            setModalIsOpen(!modalIsOpen);
          }}
        >
          {selectedEmployee !== null && (
            <div className="selected-employee">
              <img src={selectedEmployee.avatar} alt="" />
              <span>
                {selectedEmployee.name} {selectedEmployee.surname}
              </span>
            </div>
          )}
          <i
            className="fa-solid fa-angle-up"
            style={{
              transform: `rotate(${modalIsOpen ? "0deg" : "180deg"})`,
            }}
          ></i>
        </div>
        {modalIsOpen && (
          <>
            <div
              className="add-employee-button"
              onClick={() => setDisplayCreateEmployeeModal(true)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.75"
                  y="0.75"
                  width="16.5"
                  height="16.5"
                  rx="8.25"
                  stroke="#8338EC"
                  stroke-width="1.5"
                />
                <path
                  d="M9.576 8.456H13.176V9.656H9.576V13.304H8.256V9.656H4.656V8.456H8.256V4.808H9.576V8.456Z"
                  fill="#8338EC"
                />
              </svg>
              <span>დაამატე თანამშრომელი</span>
            </div>
            {!isLoading ? (
              <>
                {filteredEmployees.map((elm) => (
                  <div
                    key={elm.id}
                    onClick={() => {
                      setChoosedEmployeeId(elm.id);
                      setSelectedEmployee({
                        name: elm.name,
                        id: elm.id,
                        avatar: elm.avatar,
                        surname: elm.surname,
                      });
                      setModalIsOpen(false);
                    }}
                  >
                    <img src={elm.avatar} alt="" />
                    <span>
                      {elm.name} {elm.surname}
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <div className="loader">Loading</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeSelector;
