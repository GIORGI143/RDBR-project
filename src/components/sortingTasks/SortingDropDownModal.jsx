import React, { useEffect, useState, useContext } from "react";
import {
  getSortingDropDownContent,
  getEmployeesList,
} from "../../services/api";
import { DisplayTasksContext } from "../../contexts/DisplayTasksContextProvider";

const SortingDropDownModal = ({
  setActiveIndexOfSortingButtons,
  modalRef,
  apiEndPoints,
  activeIndexOfSortingButtons,
}) => {
  const { filterTasksObj, setFilterTasksObj } = useContext(DisplayTasksContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  //fetch data from api
  const fetchData = async () => {
    setData([]);
    try {
      let response = [];
      if (activeIndexOfSortingButtons === 2) {
        response = await getEmployeesList();
      } else {
        response = await getSortingDropDownContent(
          apiEndPoints[activeIndexOfSortingButtons][1]
        );
      }
      setData(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  //load data when activeIndexOfSortingButtons changes
  useEffect(() => {
    fetchData();
  }, [activeIndexOfSortingButtons]);

  //turn off modal when clicked outside of it
  const turnOffModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setActiveIndexOfSortingButtons(-1);
    }
  };

  useEffect(() => {
    if (filterTasksObj.departmentID !== undefined) {
      filterTasksObj.departmentID.forEach((ID) => {
        checkedItems.push(["departments", ID]);
      });
    }

    if (filterTasksObj.priorityID !== undefined) {
      filterTasksObj.priorityID.forEach((ID) => {
        checkedItems.push(["priorities", ID]);
      });
    }
    if (filterTasksObj.employeeID !== undefined) {
      checkedItems.push(["employees", filterTasksObj.employeeID]);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", turnOffModal);
    }, 50);

    return () => {
      window.removeEventListener("click", turnOffModal);
    };
  }, []);

  //handle checkbox change
  const handleCheckboxChange = (department, itemId) => {
    let newCheckedItems = [...checkedItems];
    const index = newCheckedItems.findIndex((item) => {
      if (item[0] === department && item[1] === itemId) {
        return true;
      } else {
        return false;
      }
    });

    if (activeIndexOfSortingButtons === 2) {
      // Single select logic
      newCheckedItems.forEach((elm, ind) => {
        if (elm[0] === apiEndPoints[2][1]) {
          newCheckedItems.splice(ind, 1);
        }
      });
      newCheckedItems.push([department, itemId]);
    } else {
      // Multi select logic
      if (index !== -1) {
        newCheckedItems.splice(index, 1);
      } else {
        newCheckedItems.push([department, itemId]);
      }
    }

    setCheckedItems(newCheckedItems);
  };

  //apply selected filters

  const handleSortingButton = () => {
    checkedItems.forEach((elm) => {
      if (elm[0] === "departments") {
        if (filterTasksObj.departmentID === undefined) {
          filterTasksObj.departmentID = [];
        }
        filterTasksObj.departmentID.push(elm[1]);
      } else if (elm[0] === "priorities") {
        if (filterTasksObj.priorityID === undefined) {
          filterTasksObj.priorityID = [];
        }
        filterTasksObj.priorityID.push(elm[1]);
      } else {
        filterTasksObj.employeeID = elm[1];
      }
    });
    setFilterTasksObj({ ...filterTasksObj });
  };
  //shows loading when data is fetching
  if (isLoading)
    return <div className="loader sorting-drop-down-modal">Loading...</div>;

  if (data.length === 0)
    return <div className="no-data sorting-drop-down-modal">No data</div>;

  return (
    <div className="sorting-drop-down-modal">
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              id={item.id}
              checked={checkedItems.some(
                (element) =>
                  element[0] === apiEndPoints[activeIndexOfSortingButtons][1] &&
                  element[1] === item.id
              )}
              onChange={() =>
                handleCheckboxChange(
                  apiEndPoints[activeIndexOfSortingButtons][1],
                  item.id
                )
              }
            />
            <label htmlFor={item.id}>
              {activeIndexOfSortingButtons === 2 ? (
                <>
                  <img src={item.avatar} alt={item.name} />
                  <span>
                    {item.name} {item.surname}
                  </span>
                </>
              ) : (
                item.name
              )}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          handleSortingButton();
          setActiveIndexOfSortingButtons(-1);
        }}
      >
        არჩევა
      </button>
    </div>
  );
};

export default SortingDropDownModal;
