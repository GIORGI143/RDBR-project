import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeRegistrationModal from "../employeeRegistration/EmployeeRegistrationModal";
const HeaderNavigation = () => {
  const [openModal, setOpenModal] = useState(false);
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
            setOpenModal((prev) => !prev);
          }}
        >
          თანამშრომლის შექმნა
        </button>
        <Link to={"/add-tasks"}>
          <img src="/images/plus icon.png" alt="plus icon" />
          შექმენი ახალი დავალება
        </Link>
      </nav>
      {openModal && <EmployeeRegistrationModal setOpenModal={setOpenModal} />}
    </>
  );
};

export default HeaderNavigation;
