import { Navigate, Outlet } from "react-router";

const PrivateRoute = (props) => {
  const access = localStorage.getItem("user-token");
  return access !== "" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
