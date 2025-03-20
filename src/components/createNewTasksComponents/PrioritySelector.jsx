import React, { useState, useEffect, useContext } from "react";
import { getSortingDropDownContent } from "../../services/api";
import { CreateNewTaskContext } from "../../contexts/CreateNewTaskContext";
const StatusSelector = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [priority, setPriority] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const iconsArr = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="7"
      viewBox="0 0 13 7"
      fill="none"
    >
      <path
        d="M10.4999 0.862492C10.9999 0.524992 11.5999 0.749992 11.8999 1.31249C12.1999 1.87499 11.9999 2.54999 11.5999 2.77499L6.59995 6.14999C6.29995 6.37499 5.89995 6.37499 5.59995 6.14999L0.599949 2.77499C-5.13196e-05 2.54999 -0.100051 1.76249 0.199949 1.31249C0.399949 0.749992 1.09995 0.524992 1.49995 0.862492L5.99995 3.89999L10.4999 0.862492Z"
        fill="#08A508"
      />
    </svg>,
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 0.5H11C11.6 0.5 12 0.95 12 1.625C12 2.3 11.6 2.75 11 2.75H1C0.4 2.75 0 2.3 0 1.625C0 0.95 0.4 0.5 1 0.5ZM1 7.25H11C11.6 7.25 12 7.7 12 8.375C12 9.05 11.6 9.5 11 9.5H1C0.4 9.5 0 9.05 0 8.375C0 7.7 0.4 7.25 1 7.25Z"
        fill="#FFBE0B"
      />
    </svg>,
    <svg
      width="13"
      height="7"
      viewBox="0 0 13 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.49994 6.13752C1.99994 6.47502 1.39994 6.25003 1.09994 5.80002C0.799938 5.35003 0.999938 4.56252 1.49994 4.22502L6.49994 0.850024C6.79994 0.625024 7.19994 0.625024 7.49994 0.850024L12.4999 4.22502C12.9999 4.56252 13.0999 5.23752 12.7999 5.80002C12.4999 6.36252 11.8999 6.47502 11.3999 6.13752L6.99994 3.10002L2.49994 6.13752Z"
        fill="#FA4D4D"
      />
    </svg>,
  ];
  const { setChoosedPriorityId } = useContext(CreateNewTaskContext);
  const fetchData = async () => {
    try {
      const response = await getSortingDropDownContent("priorities");
      setPriority(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) return <div className="loader">Loading</div>;
  return (
    <div>
      <div
        onClick={() => {
          setModalIsOpen(!modalIsOpen);
        }}
      >
        {selectedPriority !== null && (
          <span>
            {iconsArr[selectedPriority.index]}
            {selectedPriority.name}
          </span>
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
          {priority.map((elm, ind) => {
            return (
              <div
                key={elm.id}
                onClick={() => {
                  setSelectedPriority({
                    name: elm.name,
                    id: elm.id,
                    index: ind,
                  });
                  setChoosedPriorityId(elm.id);
                  setModalIsOpen(false);
                }}
              >
                <span>
                  {iconsArr[ind]}

                  {elm.name}
                </span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default StatusSelector;
