import React from "react";

const NewTaskValidation = ({ inputValidation }) => {
  return (
    <div className="validation">
      <span
        style={{
          color: inputValidation.inputIsFilled
            ? inputValidation.inputHasMoreThenThreeLetters
              ? "green"
              : "red"
            : "#6c757d",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
        >
          <path
            d="M12.3327 1L4.99935 8.33333L1.66602 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        მინიმუმ 3 სიმბოლო
      </span>
      <span
        style={{
          color: inputValidation.inputIsFilled
            ? inputValidation.inputHasLessThen255Letters
              ? "green"
              : "red"
            : "#6c757d",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
        >
          <path
            d="M12.3327 1L4.99935 8.33333L1.66602 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        მაქსიმუმ 255 სიმბოლო
      </span>
    </div>
  );
};

export default NewTaskValidation;
