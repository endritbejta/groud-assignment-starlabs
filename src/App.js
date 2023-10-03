import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Missions from "./pages/Missions";
import Rockets from "./pages/Rockets";
import Dragons from "./pages/Dragons";
import MyProfile from "./pages/MyProfile";

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
        element: <Dragons />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
