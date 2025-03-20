import React, { useState, useRef } from "react";
import SortingDropDownModal from "./SortingDropDownModal";

const SortingButtonsToOpenModal = () => {
  const [activeIndexOfSortingButtons, setActiveIndexOfSortingButtons] =
    useState(-1);
  const modalRef = useRef(null);
  const sortingButtons = [
    ["დეპარტამენტი", "departments"],
    ["პრიორიტეტი", "priorities"],
    ["თანამშრომელი", "employees"],
  ];
  return (
    <div className="sorting-buttons" ref={modalRef}>
      {sortingButtons.map((button, index) => (
        <button
          key={index}
          onClick={() => {
            if (activeIndexOfSortingButtons === index) {
              setActiveIndexOfSortingButtons(-1);
            } else setActiveIndexOfSortingButtons(index);
          }}
          style={{
            color: activeIndexOfSortingButtons === index ? "#8338EC" : "black",
          }}
        >
          {button[0]}
          <i
            className="fa-solid fa-angle-up"
            style={{
              transform: `rotate(${
                activeIndexOfSortingButtons === index ? "0deg" : "180deg"
              })`,
            }}
          ></i>
        </button>
      ))}
      {activeIndexOfSortingButtons !== -1 && (
        <SortingDropDownModal
          setActiveIndexOfSortingButtons={setActiveIndexOfSortingButtons}
          modalRef={modalRef}
          apiEndPoints={sortingButtons}
          activeIndexOfSortingButtons={activeIndexOfSortingButtons}
        />
      )}
    </div>
  );
};

export default SortingButtonsToOpenModal;
