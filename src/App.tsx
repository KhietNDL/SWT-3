import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/Login";
import Blog from "./pages/Blog/Blog";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import Document from "./pages/Document/Document";
import DocumentDetail from "./pages/DocumentDetail/DocumentDetail";
import RegisterPage from "./pages/Register/register";
import Program from "./pages/Program/Program";
import ProgramDetail from "./pages/ProgramDetail/ProgramDetail";
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
    },
    {
      path: "/register",
      element: <RegisterPage/>
    },
    {
      path: "/blog",
      element: <Blog/>
    },
    {
      path: "/blog/:id",
      element: <BlogDetail/>
    },
    {
      path: "/tai-lieu",
      element: <Document/>
    },
    {
      path: "/tai-lieu/:id",
      element: <DocumentDetail/>
    },
    {
      path: "/dich-vu",
      element: <Program/>
    },
    {
      path: "/danh-gia/:id",
      element: <ProgramDetail />
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default MG
