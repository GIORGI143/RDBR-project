import React from "react";
import PrioritySelector from "./PrioritySelector";
import StatusSelector from "./StatusSelector";
const PriorityAndStatus = () => {
  return (
    <div className="priority-status-selectors">
      <div>
        <span>პრიორიტეტი*</span>
        <PrioritySelector />
      </div>
      <div>
        <span>სტატუსი*</span>
        <StatusSelector />
      </div>
    </div>
  );
};

export default PriorityAndStatus;
