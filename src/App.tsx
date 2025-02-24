import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register/register";
import AssessmentList from "./pages/AssessmentList";
import GAD7Form from "./pages/Form";
import SurveyResult from "./components/SurveyResult/SurveyResult";
import "./main.css";

function MG() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <RegisterPage />
    },
    {
      path: "/test",
      element: <AssessmentList />
    },
    {
      path: "/quiz/:id",
      element: <GAD7Form />
    },
    {
      path: "/survey_result",
      element: <SurveyResult />
    }
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default MG;
