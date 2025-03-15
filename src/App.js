import routes from "./routes/routes";
import { RouterProvider } from "react-router-dom";
import { DisplayTasksContextProvider } from "./contexts/DisplayTasksContextProvider";
import "./assets/css/styles.css";
function App() {
  return (
    <DisplayTasksContextProvider>
      <RouterProvider router={routes} />
    </DisplayTasksContextProvider>
  );
}

export default App;
