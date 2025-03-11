import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register/register";
import RegisterValidation from "./pages/RegisterValidation/RegisterValidation";
import "./main.css"
import Info from "./pages/info-user";
import Booking from "./pages/Booking";
import BookingDetail from "./pages/Booking-detail";
import Blog from "./pages/Blog/index";
import BlogDetail from "./pages/BlogDetail/index";
import Document from "./pages/Document/index";
import DocumentDetail from "./pages/DocumentDetail/index";
import "./main.css"
import AssessmentList from "./pages/SurveyListUser";
import GAD7Form from "./pages/SurveyForm";
import SurveyResult from "./components/SurveyResult/SurveyResult";
import Program from "./pages/Program/Program";
import ProgramDetail from "./pages/ProgramDetail/index";
import "./main.css"
import ResetPassword from "./pages/RePass-Page";
import RootLayout from "./root";

import SurveyTypeManagementPage from "./pages/SurveyTypeManagement";
import SurveyManagementPage from "./pages/SurveyManagement";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    path: "/",
    children: [
      { path: "", element: <HomePage /> },
      { path: "info-user", element: <Info /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "register-valid", element: <RegisterValidation /> },
      { path: "booking", element: <Booking /> },
      { path: "booking-detail/:id", element: <BookingDetail /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:id", element: <BlogDetail /> },
      { path: "tai-lieu", element: <Document /> },
      { path: "tai-lieu/:id", element: <DocumentDetail /> },
      { path: "survey", element: <AssessmentList /> },
      { path: "survey/:id", element: <GAD7Form /> },
      { path: "survey_result", element: <SurveyResult /> },
      { path: "dich-vu", element: <Program /> },
      { path: "danh-gia/:id", element: <ProgramDetail /> },
      { path: "reset-password", element: <ResetPassword /> },

      { path: "survey-type-management", element: <SurveyTypeManagementPage /> },
      { path: "survey-management/:surveyTypeId", element: <SurveyManagementPage /> },
    ],
  },
]);

function MG() {
  return <RouterProvider router={router} />;
}

export default MG;
