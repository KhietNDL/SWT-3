import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/Store";

const RequireManager = ({ children }) => {
    const user = useSelector((state: RootState) => state.user);

  if (user?.roleName !== "Manager") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireManager;
