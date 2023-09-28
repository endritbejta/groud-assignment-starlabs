import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        // Verona
        path: "",
        element: <h1>Rockets</h1>,
      },
      {
        // endriti
        path: "missions",
        element: <h1>missions</h1>,
      },
      {
        // Zejdi
        path: "dragons",
        element: <h1>dragons</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
