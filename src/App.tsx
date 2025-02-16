import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import "./main.css"
import Info from "./pages/info-user";
function MG() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>
    },
    {
      path: "/info-user",
      element: <Info/>
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default MG
