import React, { useRef, useState, useEffect, useContext } from "react";
import NewTaskValidation from "../components/createNewTasksComponents/NewTaskValidation";
import PriorityAndStatus from "../components/createNewTasksComponents/PriorityAndStatus";
import DepartmentSelector from "../components/createNewTasksComponents/DepartmentSelector";
import EmployeeSelector from "../components/createNewTasksComponents/EmployeeSelector";
import { CreateNewTaskContext } from "../contexts/CreateNewTaskContext";
import { postNewTaskToAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateNewTask = () => {
  const dateRef = useRef(null);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [nameInput, setNameInput] = useState({
    name: "",
    inputIsFilled: false,
    inputHasMoreThenThreeLetters: false,
    inputHasLessThen255Letters: false,
    inputIsValid: false,
  });
  const [textareaInput, setTextareaInput] = useState({
    name: "",
    inputIsFilled: false,
    inputHasMoreThenThreeLetters: false,
    inputHasLessThen255Letters: false,
    inputIsValid: false,
  });

  const {
    choosedPriorityId,
    setChoosedPriorityId,
    choosedStatusId,
    setChoosedStatusId,
    choosedDepartmentId,
    choosedEmployeeId,
    setChoosedEmployeeId,
  } = useContext(CreateNewTaskContext);

  const isFormValid = () => {
    if (
      nameInput.inputIsFilled &&
      nameInput.inputIsValid &&
      choosedDepartmentId !== undefined &&
      choosedEmployeeId !== undefined &&
      choosedPriorityId !== undefined &&
      choosedStatusId !== undefined &&
      ((textareaInput.inputIsFilled && textareaInput.inputIsValid) ||
        !textareaInput.inputIsFilled)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    const data = {
      name: nameInput.name,
      description: textareaInput.name,
      due_date: selectedDate,
      status_id: choosedStatusId,
      employee_id: choosedEmployeeId,
      priority_id: choosedPriorityId,
    };
    try {
      await postNewTaskToAPI(data);
      setChoosedPriorityId(undefined);
      setChoosedStatusId(undefined);
      setChoosedEmployeeId(undefined);
      navigate("/");
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split("T")[0];

    setSelectedDate(formattedDate);
  }, []);

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleNameInputChange = (event, input, setInput) => {
    const newNameInput = { ...input, name: event.target.value };

    if (newNameInput.name.length !== 0) {
      newNameInput.inputIsFilled = true;
      newNameInput.inputHasMoreThenThreeLetters = newNameInput.name.length >= 3;
      newNameInput.inputHasLessThen255Letters = newNameInput.name.length <= 255;
      if (
        newNameInput.inputHasLessThen255Letters &&
        newNameInput.inputHasMoreThenThreeLetters
      ) {
        newNameInput.inputIsValid = true;
      }
    } else {
      newNameInput.inputIsFilled = false;
      newNameInput.inputIsValid = false;
    }

    setInput(newNameInput);
  };

  return (
    <>
      <h2>შექმენი ახალი დავალება</h2>

      <form action="" className="create-new-task" onSubmit={handleSubmit}>
        <div>
          <div>
            <div>
              <label htmlFor="tital">სათაური*</label>
              <input
                type="text"
                id="tital"
                name="tital"
                value={nameInput.name}
                onChange={(e) =>
                  handleNameInputChange(e, nameInput, setNameInput)
                }
              />
              <NewTaskValidation inputValidation={nameInput} />
            </div>
            <div>
              <label htmlFor="description">აღწერა</label>
              <textarea
                name="message"
                id="description"
                value={textareaInput.name}
                onChange={(e) =>
                  handleNameInputChange(e, textareaInput, setTextareaInput)
                }
              ></textarea>
              <NewTaskValidation inputValidation={textareaInput} />
            </div>
            <PriorityAndStatus />
          </div>
          <div className="department-and-employee-selectors">
            <DepartmentSelector />
            <EmployeeSelector />
            <div className="date">
              <label htmlFor="date">დედლაინი</label>
              <input
                type="date"
                id="date"
                ref={dateRef}
                onChange={handleChange}
                value={selectedDate}
                onClick={() => dateRef.current?.showPicker()}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
        </div>
        <button className="create-new-task-button">დავალების შექმნა</button>
      </form>
    </>
  );
};

export default CreateNewTask;
