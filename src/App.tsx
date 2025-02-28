import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register/register";
import "./main.css"
import Info from "./pages/info-user";
import Booking from "./pages/Booking";
import BookingDetail from "./pages/Booking-detail";
import Blog from "./pages/Blog/Blog";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import Document from "./pages/Document/Document";
import DocumentDetail from "./pages/DocumentDetail/DocumentDetail";
import "./main.css"
import AssessmentList from "./pages/AssessmentList";
import GAD7Form from "./pages/Form";
import SurveyResult from "./components/SurveyResult/SurveyResult";
import Program from "./pages/Program/Program";
import ProgramDetail from "./pages/ProgramDetail/ProgramDetail";
import "./main.css"
import ResetPassword from "./pages/RePass-Page";
import RootLayout from "./root";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    path: "/",
    children: [
      { path: "", element: <HomePage /> },
      { path: "info-user", element: <Info /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "booking", element: <Booking /> },
      { path: "booking-detail/:id", element: <BookingDetail /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:id", element: <BlogDetail /> },
      { path: "tai-lieu", element: <Document /> },
      { path: "tai-lieu/:id", element: <DocumentDetail /> },
      { path: "test", element: <AssessmentList /> },
      { path: "quiz/:id", element: <GAD7Form /> },
      { path: "survey_result", element: <SurveyResult /> },
      { path: "dich-vu", element: <Program /> },
      { path: "danh-gia/:id", element: <ProgramDetail /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
]);

function MG() {
  return <RouterProvider router={router} />;
}

export default MG;
