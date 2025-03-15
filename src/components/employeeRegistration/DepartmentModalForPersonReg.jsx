import React, { useState, useEffect } from "react";
import { getSortingDropDownContent } from "../../services/api";
const DepartmentModalForPersonReg = ({
  modalRef,
  setDepartmentModalIsOpen,
  setIdAndValue,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState([]);

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
    {
      fetchData();
    }
  }, []);

  //turn off modal when clicked outside of it
  const turnOffModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setDepartmentModalIsOpen(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", turnOffModal);
    }, 50);

    return () => {
      window.removeEventListener("click", turnOffModal);
    };
  }, []);

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <>
      {departments.map((department) => {
        return (
          <span
            key={department.id}
            onClick={() => {
              setIdAndValue({
                id: department.id,
                name: department.name,
              });
              setDepartmentModalIsOpen(false);
            }}
          >
            {department.name}
          </span>
        );
      })}
    </>
  );
};

export default DepartmentModalForPersonReg;
