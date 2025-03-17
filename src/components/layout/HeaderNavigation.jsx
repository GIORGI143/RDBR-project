import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DisplayTasksContext } from "../../contexts/DisplayTasksContextProvider";
import EmployeeRegistrationModal from "../employeeRegistration/EmployeeRegistrationModal";
const HeaderNavigation = () => {
  const { displayCreateEmployeeModal, setDisplayCreateEmployeeModal } =
    useContext(DisplayTasksContext);
  return (
    <>
      <h1>
        <Link to={"/"}>
          <span>Momentum</span>
          <img src="/images/Hourglass.png" alt=" hourglass logo" />
        </Link>
      </h1>
      <nav>
        <button
          onClick={() => {
            setDisplayCreateEmployeeModal((prev) => !prev);
          }}
        >
          თანამშრომლის შექმნა
        </button>
        <Link to={"/add-tasks"}>
          <img src="/images/plus icon.png" alt="plus icon" />
          შექმენი ახალი დავალება
        </Link>
      </nav>
      {displayCreateEmployeeModal && (
        <EmployeeRegistrationModal
          setOpenModal={setDisplayCreateEmployeeModal}
        />
      )}
    </>
  );
};

export default HeaderNavigation;
