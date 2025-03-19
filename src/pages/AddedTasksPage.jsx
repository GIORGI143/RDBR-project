import React from "react";
import SortingButtonsToOpenModal from "../components/sortingTasks/SortingButtonsToOpenModal";
import RemoveAppliedSortingFilters from "../components/sortingTasks/RemoveAppliedSortingFilters";
import DisplayTasks from "../components/displayTasks/DisplayTasks";
const AddedTasksPage = () => {
  return (
    <div className="added-tasks-page">
      <h2>დავალებების გვერდი</h2>
      <SortingButtonsToOpenModal />
      <RemoveAppliedSortingFilters />
      <DisplayTasks />
    </div>
  );
};

export default AddedTasksPage;
