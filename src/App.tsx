import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register/register";
import RegisterValidation from "./pages/RegisterValidation/RegisterValidation";
import "./main.css";
import Info from "./pages/info-user";
import Booking from "./pages/Booking";
import BookingDetail from "./pages/Booking-detail";
import Blog from "./pages/Blog/index";
import BlogDetail from "./pages/BlogDetail/index";
import Document from "./pages/Document/index";
import DocumentDetail from "./pages/DocumentDetail/index";
import "./main.css"
import SurveyListPage from "./pages/SurveyListUser";
import SurveyResult from "./components/SurveyResult/SurveyResult";
import ProgramPage from "./pages/Program/index";
import ProgramDetail from "./pages/ProgramDetail/index";
import "./main.css";
import ResetPassword from "./pages/RePass-Page";
import RootLayout from "./root";
import OrderDetailPage from "./pages/OrderDetail";
import ManagePage from "./pages/Manager";
import RequireManager from "./components/RequireManager";
import Psychologist from "./pages/Psychologist";
import SurveyTypeManagementPage from "./pages/SurveyTypeManagement";
import SurveyManagementPage from "./pages/SurveyManagement";
import PaymentPage from "./pages/Payment";
import TakeSurveyPage from "./pages/TakeSurvey";

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
      { path: "survey", element: <SurveyListPage /> },
      { path: "take-survey/:surveyId", element: <TakeSurveyPage /> },
      { path: "survey_result", element: <SurveyResult /> },
      { path: "dich-vu", element: <ProgramPage /> },
      { path: "danh-gia/:id", element: <ProgramDetail /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "manage/SurveyTypeManagement", element: <SurveyTypeManagementPage /> },
      { path: "manage/survey-management/:surveyId", element: <SurveyManagementPage /> },
      {
        path: "manage",
        element: (
          <RequireManager>
            <ManagePage />
          </RequireManager>
        ),
      },
      { path: "Psycologist", element: <Psychologist /> },
      { path: "order-detail/:id", element: <OrderDetailPage /> },
      { path: "payment", element: <PaymentPage /> },
    ],
  },
]);

function MG() {
  return <RouterProvider router={router} />;
}

export default MG;
