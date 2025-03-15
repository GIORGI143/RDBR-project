import React, { useState, useRef } from "react";
import DepartmentModalForPersonReg from "./DepartmentModalForPersonReg";
import ImageUpload from "./ImageUpload";
import ValidationMessages from "./ValidationMessages";
import { postEmployeeInfo } from "../../services/api";

const EmployeeRegistrationModal = ({ setOpenModal }) => {
  //departments varables
  const modalRef = useRef(null);
  const [departmentModalIsOpen, setDepartmentModalIsOpen] = useState(false);
  const [departmentIdAndValue, setDepartmentIdAndValue] = useState(null);

  //name and surname varables
  const [nameValidation, setNameValidation] = useState({
    haveValueInside: false,
    requairements: [false, false, false],
    isValid: false,
  });

  const [surnameValidation, setSurameValidation] = useState({
    haveValueInside: false,
    requairements: [false, false, false],
    isValid: false,
  });

  const [nameValue, setNameValue] = useState("");
  const [surnameValue, setSurnameValue] = useState("");

  // upload image varables
  const [image, setImage] = useState(null);

  // name and surname validation
  const isEnglishOrGeorgian = (text) =>
    /^[A-Za-z\u10A0-\u10FF0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?/-]+$/.test(text);
  const nameValidationMessages = [
    "მინიმუმ 2 სიმბოლო",
    "მაქსიმუმ 255 სიმბოლო",
    "მარტო ლათინური და ქართული სიმბოლოები",
  ];

  const formIsValid = () => {
    if (
      nameValidation.isValid &&
      surnameValidation.isValid &&
      departmentIdAndValue !== null &&
      image !== null
    ) {
      return true;
    }
    return false;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formIsValid()) {
      console.log("false");
      return;
    }

    const data = {
      name: nameValue,
      surname: surnameValue,
      avatar: image,
      department_id: departmentIdAndValue.id,
    };
    try {
      await postEmployeeInfo(data);
      setOpenModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleValidation = (e, validation, setValidation, setValue) => {
    setValue(e.target.value);
    const nameLength = e.target.value.length;

    if (nameLength !== 0) {
      validation.haveValueInside = true;
    } else {
      validation.haveValueInside = false;
      return;
    }

    if (nameLength < 2) {
      validation.requairements[0] = false;
    } else {
      validation.requairements[0] = true;
    }

    if (nameLength > 255) {
      validation.requairements[1] = false;
    } else {
      validation.requairements[1] = true;
    }

    if (isEnglishOrGeorgian(e.target.value)) {
      validation.requairements[2] = true;
    } else {
      validation.requairements[2] = false;
    }

    if (
      validation.requairements[2] &&
      validation.requairements[1] &&
      validation.requairements[0]
    ) {
      validation.isValid = true;
    }
    setValidation({ ...validation });
  };

  return (
    <div className="employee-registration-modal">
      <div className="modal-content">
        <div className="modal-header">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <img src="/images/exit-button.svg" alt="Exit Button" />
          </button>
          <h2>თანამშრომლის დამატება</h2>
        </div>
        <form action="#" method="post" onSubmit={handleSubmit}>
          <div className="name-surname">
            <div>
              <label htmlFor="name">სახელი*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={nameValue}
                onChange={(e) =>
                  handleValidation(
                    e,
                    nameValidation,
                    setNameValidation,
                    setNameValue
                  )
                }
              />
              <ValidationMessages
                messages={nameValidationMessages}
                validation={nameValidation}
              />
            </div>
            <div>
              <label htmlFor="surname">გვარი*</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={surnameValue}
                onChange={(e) =>
                  handleValidation(
                    e,
                    surnameValidation,
                    setSurameValidation,
                    setSurnameValue
                  )
                }
              />
              <ValidationMessages
                messages={nameValidationMessages}
                validation={surnameValidation}
              />
            </div>
          </div>
          <ImageUpload setImage={setImage} />
          <div className="department-buttons">
            <div>
              <span>დეპარტამენტი*</span>
              <div className="departments-drop-down-select" ref={modalRef}>
                <div
                  onClick={() =>
                    setDepartmentModalIsOpen(!departmentModalIsOpen)
                  }
                >
                  <span>
                    {departmentIdAndValue !== null && departmentIdAndValue.name}
                  </span>
                  <i
                    className="fa-solid fa-angle-up"
                    style={{
                      transform: `rotate(${
                        departmentModalIsOpen ? "0deg" : "180deg"
                      })`,
                    }}
                  ></i>
                </div>
                {departmentModalIsOpen && (
                  <DepartmentModalForPersonReg
                    modalRef={modalRef}
                    setDepartmentModalIsOpen={setDepartmentModalIsOpen}
                    setIdAndValue={setDepartmentIdAndValue}
                  />
                )}
              </div>
            </div>
            <div className="person-registration-modal-buttons">
              <button type="button" onClick={() => setOpenModal(false)}>
                გაუქმება
              </button>
              <button type="submit">დაამატე თანამშრომელი</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegistrationModal;
