import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/Login";
import "./main.css"

function MG() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>
    },
    {
      path: "/login",
      element: <LoginPage/>
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default MG
