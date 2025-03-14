import { BookOpen, Users, ClipboardList, Calendar, LogOut } from "lucide-react";
import "./index.scss";
import { useState } from "react";
import SurveyManagement from "../SurveyManagement";

import logo from "../../images/Logo.png";
import UserManagement from "../UserManagement";
import SubscriptionManagement from "../ProgramManagement";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";
const Sidebar = () => {
  const [activePage, setActivePage] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
      dispatch(logout());
      localStorage.removeItem("token");
      navigate("/");
    };
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2 className="sidebar-title">
        <img src={logo} width={80} alt="Logo" /> Admin Portal
        </h2>
        <ul className="sidebar-menu">
          <li
            className={activePage === "Programs" ? "active" : ""}
            onClick={() => setActivePage("Programs")}
          >
            <BookOpen /> <span>Programs</span>
          </li>
          <li
            className={activePage === "Users" ? "active" : ""}
            onClick={() => setActivePage("Users")}
          >
            <Users /> <span>Users</span>
          </li>
          <li
            className={activePage === "Surveys" ? "active" : ""}
            onClick={() => setActivePage("Surveys")}
          >
            <ClipboardList /> <span>Surveys</span>
          </li>
          <li>
            <Calendar /> <span>Appointments</span>
          </li>
        </ul>
        <div className="logout">
          <span onClick={handleLogout}>Log out</span>
        </div>
      </div>

      <div className="content">
        {activePage === "Surveys" && <SurveyManagement />}
        {activePage === "Programs" && <SubscriptionManagement />}
        {activePage === "Users" && <UserManagement />}
      </div>
    </div>
  );
};

export default Sidebar;
