import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import "./main.css"
function MG() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default MG
