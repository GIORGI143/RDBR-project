import Layout from "../components/layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import React from "react";
import AddedTasksPage from "../pages/AddedTasksPage";
import CreateNewTask from "../pages/CreateNewTask";
import TaskDetails from "../pages/TaskDetails";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        index: true,
        element: <AddedTasksPage />,
      },
      {
        path: "/add-tasks",
        element: <CreateNewTask />,
      },
      {
        path: "/task-details/:id",
        element: <TaskDetails />,
      },
    ],
  },
]);

export default routes;
