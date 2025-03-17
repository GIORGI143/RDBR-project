import Layout from "../components/layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import React from "react";
import AddedTasksPage from "../pages/AddedTasksPage";
import CreateNewTask from "../pages/CreateNewTask";

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
    ],
  },
]);

export default routes;
