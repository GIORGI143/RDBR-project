import routes from "./routes/routes";
import CreateNewTaskContextProvider from "./contexts/CreateNewTaskContext";
import { RouterProvider } from "react-router-dom";
import { DisplayTasksContextProvider } from "./contexts/DisplayTasksContextProvider";
import "./assets/css/styles.css";
function App() {
  return (
    <CreateNewTaskContextProvider>
      <DisplayTasksContextProvider>
        <RouterProvider router={routes} />
      </DisplayTasksContextProvider>
    </CreateNewTaskContextProvider>
  );
}

export default App;
