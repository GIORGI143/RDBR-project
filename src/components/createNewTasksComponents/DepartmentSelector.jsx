import React, { useState, useEffect, useContext, useRef } from "react";
import { getSortingDropDownContent } from "../../services/api";
import { CreateNewTaskContext } from "../../contexts/CreateNewTaskContext";

const DepartmentSelector = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setChoosedDepartmentId, setChoosedEmployeeId } =
    useContext(CreateNewTaskContext);
  const modalRef = useRef(null);
  const [selectedDepartments, setSelectedDepartment] = useState(null);
  const fetchData = async () => {
    try {
      const response = await getSortingDropDownContent("departments");
      setDepartments(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();

    const handleClickOutside = (MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(MouseEvent.target)) {
        setModalIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  if (isLoading) return <div className="loader">Loading</div>;

  return (
    <div className="selector">
      <span>დეპარტამენტი*</span>
      <div className="selector__dropdown" ref={modalRef}>
        <div
          onClick={() => {
            setModalIsOpen(!modalIsOpen);
          }}
        >
          <span>
            {selectedDepartments !== null && selectedDepartments.name}
          </span>
          <i
            className="fa-solid fa-angle-up arrow-icon"
            style={{
              transform: `rotate(${modalIsOpen ? "0deg" : "180deg"})`,
            }}
          ></i>
        </div>
        {modalIsOpen && (
          <>
            {departments.map((elm) => {
              return (
                <div
                  key={elm.id}
                  onClick={() => {
                    setSelectedDepartment({ name: elm.name, id: elm.id });
                    setChoosedDepartmentId(elm.id);
                    setChoosedEmployeeId(undefined);
                    setModalIsOpen(false);
                  }}
                >
                  <span>{elm.name}</span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default DepartmentSelector;
