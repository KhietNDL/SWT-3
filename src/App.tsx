import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/Login";
import BlogPage from "./pages/Blog";
import BlogDetailPage from "./pages/BlogDetail";
import DocumentPage from "./pages/Document";
import DocumentDetailPage from "./pages/DocumentDetail";
import ProgramPage from "./pages/Program";
import ProgramDetailPage from "./pages/ProgramDetail";

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
      path: "/blog",
      element: <BlogPage/>
    },
    {
      path: "/blog/:id",
      element: <BlogDetailPage/>
    },
    {
      path: "/tai-lieu",
      element: <DocumentPage/>
    },
    {
      path: "/tai-lieu/:id",
      element: <DocumentDetailPage/>
    },
    {
      path: "/dich-vu",
      element: <ProgramPage/>
    },
    {
      path: "/danh-gia/:id",
      element: <ProgramDetailPage/>
    }
   
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default MG
