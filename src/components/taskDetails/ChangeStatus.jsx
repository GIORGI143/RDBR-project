import React, { useState, useEffect } from "react";
import { getData, updateTaskStatus } from "../../services/api";
const ChangeStatus = ({ status, ID }) => {
  const [statuses, setStatuses] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const fetchData = async () => {
    try {
      const data = await getData("statuses");
      setStatuses(data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  const handleUpdateStatus = (statusID) => {
    updateTaskStatus(ID, statusID);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="change-status" onClick={() => setModalIsOpen(!modalIsOpen)}>
      <div>
        {selectedStatus}
        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6199 5.7207L7.81655 9.52404C7.36738 9.9732 6.63238 9.9732 6.18322 9.52404L2.37988 5.7207"
            stroke="#343A40"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      {modalIsOpen && (
        <>
          {isLoading ? (
            <>
              <div className="loader">Loading</div>
            </>
          ) : (
            <>
              {statuses.map((elm) => {
                return (
                  <div
                    onClick={() => {
                      handleUpdateStatus(elm.id);
                      setSelectedStatus(elm.name);
                      setModalIsOpen(false);
                    }}
                    key={elm.id}
                  >
                    {elm.name}
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ChangeStatus;
