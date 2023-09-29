import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Missions from "./pages/Missions";
import Rockets from "./pages/Rockets";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        // Verona
        path: "",
        element: <Rockets />,
      },
      {
        // endriti
        path: "missions",
        element: <Missions />,
      },
      {
        // Zejdi
        path: "dragons",
        element: <h1>dragons</h1>,
      },
      {
        // Zejdi
        path: "my-profile",
        element: <h1>My Profile</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
