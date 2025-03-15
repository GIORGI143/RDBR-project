import React from "react";

const ValidationMessages = ({ messages, validation }) => {
  //validation have values :
  //   {
  //    haveValueInside: false,
  //    requairements: [false,false,false],
  //     isValid: false,
  //   }

  return (
    <div className="validation">
      {messages.map((message, index) => (
        <span
          key={index}
          style={{
            color: validation.haveValueInside
              ? validation.requairements[index]
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
          {message}
        </span>
      ))}
    </div>
  );
};

export default ValidationMessages;
