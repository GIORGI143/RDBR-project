import React, { useState, useEffect, useContext, useRef } from "react";
import { getSortingDropDownContent } from "../../services/api";
import { CreateNewTaskContext } from "../../contexts/CreateNewTaskContext";

const StatusSelector = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const { setChoosedStatusId } = useContext(CreateNewTaskContext);
  const modalRef = useRef(null);
  const fetchData = async () => {
    try {
      const response = await getSortingDropDownContent("statuses");
      setStatuses(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
  useEffect(() => {
    fetchData();

    const handleClickOutside = (MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(MouseEvent.target)) {
        setModalIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  if (isLoading) return <div className="loader">Loading</div>;
  return (
    <div ref={modalRef}>
      <div
        onClick={() => {
          setModalIsOpen(!modalIsOpen);
        }}
      >
        <span>{selectedStatus !== null && selectedStatus.name}</span>
        <i
          className="fa-solid fa-angle-up"
          style={{
            transform: `rotate(${modalIsOpen ? "0deg" : "180deg"})`,
          }}
        ></i>
      </div>
      {modalIsOpen && (
        <>
          {statuses.map((elm) => {
            return (
              <div
                key={elm.id}
                onClick={() => {
                  setSelectedStatus({ name: elm.name, id: elm.id });
                  setChoosedStatusId(elm.id);
                  setModalIsOpen(false);
                }}
              >
                <span>{elm.name}</span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default StatusSelector;
